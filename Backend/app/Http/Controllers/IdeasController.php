<?php

namespace App\Http\Controllers;

use App\Models\Ideas;
use App\Models\Category;
use App\Models\User;
use App\Models\AcademicYear;
use App\Models\Department;
use App\Http\Requests\IdeaRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use League\Csv\Writer;
use Illuminate\Support\Facades\Response;
use App\Helpers\EmailHelper;

class IdeasController extends Controller
{

    private $queryIdeaInfo = "select ideas.*, count(voting.is_liked) as liked_count, count(voting.is_unliked) as unliked_count, users.department_id"
        . " from ideas"
        . " left join voting on ideas.idea_id = voting.idea_id"
        . " inner join users on ideas.user_id = users.id"
        . " where users.is_active = 1"
        . " group by ideas.idea_id"
        . " %s"
        . " %s";


    private $queryIdeaInfoWithDeptId = "select ideas.*, count(voting.is_liked) as liked_count, count(voting.is_unliked) as unliked_count, users.department_id"
        . " from ideas"
        . " left join voting on ideas.idea_id = voting.idea_id"
        . " inner join users on ideas.user_id = users.id"
        . " where users.department_id = %d"
        . " and users.is_active = 1"
        . " group by ideas.idea_id"
        . " %s"
        . " %s";

    private $queryGetQACoordinator = "select QA.user_name as qa_name, QA.email as qa_email, poster.user_name as post_by"
        . " from users QA"
        . " inner join users poster on QA.department_id = poster.department_id"
        . " where QA.user_role_id = 3"
        . " and poster.id = %d";

    private $limit5 = " limit 0,3";
    private $orderByLikedCount = " order by liked_count desc";
    private $orderByCreatedDate = " order by ideas.created_date desc";

    public function index($id = "")
    {
        $data = '';
        if (!empty($id)) {
            //Get By id
            $ideas = Ideas::with('user', 'category', 'academic_years', 'department')->find([$id]);
        } else {
            //Get all idea list
            $ideas = Ideas::with('user', 'category', 'academic_years', 'department')->orderBy('created_date', 'desc')->get();
        }

        if (is_null($ideas) || $ideas->count() == 0) {
            return response()->json([
                'data' => $id,
                'message' => "NOT_FOUND"
            ], 404);
        }

        foreach ($ideas as $idea) {
            $idea['attachment'] = null;
            if (!empty($idea->file_path)) {
                $academicYearCode = AcademicYear::where('academic_id', $idea->academic_id)->value('academic_year_code');
                $idea['attachment'] = asset(env('POST_ATTACHMENT_PATH') . "/" . $academicYearCode . "/" . $idea->file_path);
            }
        }
        // Return Json Response
        return response()->json([
            'data' => $ideas,
            'message' => "SUCCESS"
        ], 200);
    }

    public function listGetBy(IdeaRequest $request)
    {
        $data = "";
        $message = "SUCCESS";
        $responseCode = 200;
        $queryToSelect = "";

        try {
            $getBy = $request->getBy;

            switch ($getBy) {
                    //Get popular ideas
                case 'popular':
                    if (!$request->department_id) {
                        $queryToSelect = sprintf($this->queryIdeaInfo, $this->orderByLikedCount, $this->limit5);
                    } else {
                        $queryToSelect = sprintf($this->queryIdeaInfoWithDeptId, $request->department_id, $this->orderByLikedCount, $this->limit5);
                    }
                    break;
                    //Get latest ideas
                case 'latest':
                    if (!$request->department_id) {
                        $queryToSelect = sprintf($this->queryIdeaInfo, $this->orderByCreatedDate, "");
                    } else {
                        $queryToSelect = sprintf($this->queryIdeaInfoWithDeptId, $request->department_id, $this->orderByCreatedDate, "");
                    }
                    break;

                    //Get ideas by Department id
                case 'byDepartment':
                    if (!$request->department_id) {
                        $data = "Department_id";
                        $message = "DEPARTMENT_ID_REQUIRED";
                        $responseCode = 422;
                        goto RETURN_STATEMENT;
                    } else {
                        $queryToSelect = sprintf($this->queryIdeaInfoWithDeptId, $request->department_id, "", "");
                    }
                    break;
                default:
                    $data = $getBy;
                    $message = "NOT_FOUND";
                    $responseCode = 404;
                    goto RETURN_STATEMENT;
                    break;
            }

            $data = DB::select($queryToSelect);

            if (is_null($data)) {
                $data = $getBy;
                $message = "NOT_FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            }

            foreach ($data as $idea) {
                $idea->attachment = null;

                $idea->user = User::find($idea->user_id);
                $idea->category = Category::find($idea->category_id);
                $idea->academic_years = AcademicYear::find($idea->academic_id);
                $idea->department = Department::find($idea->department_id);

                if (!empty($idea->file_path)) {
                    $academicYearCode = AcademicYear::where('academic_id', $idea->academic_id)->value('academic_year_code');
                    $idea->attachment = asset(env('POST_ATTACHMENT_PATH') . "/" . $academicYearCode . "/" . $idea->file_path);
                }
            }
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        RETURN_STATEMENT:
        // Return Json Response
        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }

    public function store(IdeaRequest $request)
    {
        $data = "";
        $message = "";
        $responseCode = 200;

        try {
            if (AcademicYear::where([['academic_id', $request->academic_id], ['is_active', 1]])->count() == 0) {
                $data = "academic year";
                $message = "NOT_FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            }

            // academicEndDate = AcademicYear::select('select academic_edate from academic where academic_id = ?', [1])->pluck('acdemic_edate');

            $academicEndDate = AcademicYear::where('academic_id', $request->academic_id)->value('academic_edate');
            // if ($academicEndDate < date('Y-m-d H:i:s')) {
            //     $data = "academic year";
            //     $message = "CLOUSRE_DATE_REACH";
            //     $responseCode = 405;
            //     goto RETURN_STATEMENT;
            // }

            if (Category::where([['category_id', $request->category_id], ['is_active', 1]])->count() == 0) {
                $data = "category";
                $message = "NOT_FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            }

            if (User::where('id', $request->user_id)->count() == 0) {
                $data = "user";
                $message = "NOT_FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            }

            if (!$request->attachment) {
                $imageName = null;
            } else {
                $academicYearCode = AcademicYear::where('academic_id', $request->academic_id)->value('academic_year_code');

                $getImage = $request->attachment;
                $imageName = strtoupper(md5(uniqid(rand(), true))) . '.' . $getImage->extension();
                $imagePath = '.' . env('POST_ATTACHMENT_PATH') . '/' . $academicYearCode;
                if (!File::isDirectory($imagePath)) {
                    File::makeDirectory(($imagePath), 0777, true, true);
                }
                $getImage->move($imagePath, $imageName);
            }

            //Add new idea
            $ideas = Ideas::create([
                'idea_description' => $request->idea_description,
                'category_id' => $request->category_id,
                'user_id' => $request->user_id,
                'academic_id' => $request->academic_id,
                'is_anonymous' => $request->is_anonymous,
                'file_path' => $imageName,
                'created_date' => date('Y-m-d H:i:s')

            ]);

            $queryQA = sprintf($this->queryGetQACoordinator, $request->user_id);
            $usersQA = DB::select($queryQA);

            try {
                foreach ($usersQA as $user) {
                    EmailHelper::sendEmail(
                        $name = "$user->qa_name",
                        $subject = "[EWSD Group-1][New Idea] $user->post_by posted an idea.",
                        $receiptEmail = $user->qa_email,
                        $description = "$user->post_by posted following new idea. \n'$request->idea_description'"
                    );
                }
            } catch (\Throwable $th) {
                //Skip email sending if occurred an error during email sending.
            }

            $data = $ideas->idea_id;
            $message = "SUCCESS";
            $responseCode = 200;
        } catch (\Throwable $th) {

            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        RETURN_STATEMENT:

        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }

    public function update(IdeaRequest $request, $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            $ideas = Ideas::find($id);
            if (!$ideas) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            }
            if (Category::where([['category_id', $request->category_id], ['is_active', 1]])->count() == 0) {
                $data = "category";
                $message = "NOT_FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            }
            if (User::where('id', $request->user_id)->count() == 0) {
                $data = "user";
                $message = "NOT_FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            }

            $ideas->idea_description = $request->idea_description;
            $ideas->category_id = $request->category_id;
            $ideas->user_id = $request->user_id;
            $ideas->academic_id = $request->academic_id;
            $ideas->is_anonymous = $request->is_anonymous;
            $ideas->updated_date = date('Y-m-d H:i:s');

            if (!$request->attachment) {
                $imageName = null;
            } else {
                $getImage = $request->attachment;
                $imageName = strtoupper(md5(uniqid(rand(), true))) . '.' . $getImage->extension();
                $getImage->move('.' . env('POST_ATTACHMENT_PATH'), $imageName);
            }
            $ideas->file_path = $imageName;

            // Update Idea 
            $ideas->save();
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        RETURN_STATEMENT:
        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }

    public function ideaReport(Request $request)
    {
        $data = "";
        $message = "SUCCESS";
        $responseCode = 200;
        try {
            $para_has_comment = $request->has_comment;
            $para_is_anonymous = $request->is_anonymous;
            $para_category_id = $request->category_id;
            $para_department_id = $request->department_id;
            $para_academic_year = $request->academic_year;
            $para_show_all = $request->show_all;
            $data = DB::select(
                'CALL sp_idea_rpt(?, ?, ?, ?, ?, ?)',
                [$para_has_comment, $para_is_anonymous, $para_category_id, $para_department_id, $para_academic_year, $para_show_all]
            );
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }
        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }

    public function downloadIdeaCsv(Request $request)
    {
        $data = "";
        $message = "SUCCESS";
        $responseCode = 200;
        try {
            // $ideas = Ideas::where("academic_yr", $academic_yr)->get()->toArray();
            // $ideas = Ideas::all()->toArray();
            $academicYear = AcademicYear::find($request->query('academic_year'))->academic_year;
            $para_has_comment = $request->query('has_comment');
            $para_is_anonymous = $request->query('is_anonymous');
            $para_category_id = $request->query('category_id');
            $para_department_id = $request->query('department_id');
            $para_academic_year = $request->query('academic_year');
            $para_show_all = $request->query('show_all');
            $results = DB::select(
                'CALL sp_idea_rpt(?, ?, ?, ?, ?, ?)',
                [$para_has_comment, $para_is_anonymous, $para_category_id, $para_department_id, $para_academic_year, $para_show_all]
            );
            $ideas = collect($results)->map(function ($x) {
                return (array) $x;
            })->toArray();
            if (count($ideas) == 0) {
                $data = "There is no data to download";
                return response()->json([
                    'data' => $data,
                    'message' => $message
                ], $responseCode);
            } else {
                $csv =  Writer::createFromString('');
                // $csv->insertOne([
                //     'idea_id',
                //     'idea_description',
                //     'category_id',
                //     'user_id',
                //     'is_anonymous',
                //     'file_path',
                //     'created_date',
                //     'updated_date',
                //     'academic_id'
                // ]);

                $csv->insertOne([
                    'idea_posted_date',
                    'idea_description',
                    'posted_by',
                    'email',
                    'category_id',
                    'category_type',
                    'department_id',
                    'department_description',
                    'academic_id',
                    'academic_year',
                    'academic_sdate',
                    'academic_edate',
                    'has_comments',
                    'has_comments_flag',
                    'is_anonymous',
                    'comment_cnts',
                    'anonymous_comment_cnts',
                    'unique_comment_users'
                ]);

                foreach ($ideas as $row) {
                    $csv->insertOne($row);
                }

                $data = $csv->getContent();
            }
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }
        $filename = $academicYear . '_idea_report.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=" ' . $filename . '"',
        ];
        return Response::make($data, 200, $headers);
    }

    public function ideaValidate()
    {
        $canPost = 0;

        $data = "";
        $message = "";
        $responseCode = 200;

        $today = date('Y-m-d H:i:s');

        try {

            //var_dump($canPost);
            $academic_year = AcademicYear::select('academic_edate')
                ->where('is_active', 1)
                ->orderby('created_date', 'DESC')
                ->first();

            if ($today < $academic_year->academic_edate) {
                $canPost = 1;
            }
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        return response()->json([
            'canPost' => $canPost
        ], $responseCode);
    }

    public function commentValidate()
    {
        $canPost = 0;

        $data = "";
        $message = "";
        $responseCode = 200;

        $today = date('Y-m-d H:i:s');

        try {

            $academic_year = AcademicYear::select('final_closure_date')
                ->where('is_active', 1)
                ->orderby('created_date', 'DESC')
                ->first();

            if ($today < $academic_year->final_closure_date) {
                $canPost = 1;
            }
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        return response()->json([
            'canPost' => $canPost
        ], $responseCode);
    }

    public function anonymousCommentReport(Request $request)
    {
        $data = "";
        $message = "SUCCESS";
        $responseCode = 200;

        try {

            $para_category_id = $request->category_id;
            $para_from_date = $request->from_date;
            $para_to_date = $request->to_date;
            $para_department_id = $request->department_id;
            $para_show_all = $request->show_all;

            if (!$para_show_all && $para_show_all <> "0") {
                $para_show_all = 1;
            }

            $data = DB::select(
                'CALL sp_anonmyous_comments_rpt(?, ?, ?, ?, ?)',
                [$para_category_id, $para_from_date, $para_to_date, $para_department_id, $para_show_all]
            );
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }

    public function anonymousCommentReportCsv(Request $request)
    {
        $data = "";
        $message = "SUCCESS";
        $responseCode = 200;

        try {

            $para_category_id = $request->query('category_id');
            $para_from_date = $request->query('from_date');
            $para_to_date = $request->query('to_date');
            $para_department_id = $request->query('department_id');
            $para_show_all = $request->query('show_all');

            $data = DB::select(
                'CALL sp_anonmyous_comments_rpt(?, ?, ?, ?, ?)',
                [$para_category_id, $para_from_date, $para_to_date, $para_department_id, $para_show_all]
            );

            $ideas = collect($data)->map(function ($x) {
                return (array) $x;
            })->toArray();
            if (count($ideas) == 0) {
                $data = "There is no data to download";
                return response()->json([
                    'data' => $data,
                    'message' => $message
                ], $responseCode);
            } else {
                $csv =  Writer::createFromString('');
                $csv->insertOne([
                    'comment_date',
                    'comment_description',
                    'idea_description',
                    'category_id',
                    'category_type',
                    'user_name',
                    'department_id',
                    'department'
                ]);

                foreach ($ideas as $row) {
                    $csv->insertOne($row);
                }

                $data = $csv->getContent();
            }
        } catch (\Throwable $th) {
            return response()->json([
                'data' => "UNEXPECTED_ERROR",
                'message' => $th->getMessage()
            ], 500);
        }

        $filename = 'nonymous_comment_report.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=" ' . $filename . '"',
        ];
        return Response::make($data, 200, $headers);
    }
}
