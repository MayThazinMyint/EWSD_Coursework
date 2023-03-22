<?php

namespace App\Http\Controllers;

use App\Models\Ideas;
use App\Models\Category;
use App\Models\User;
use App\Models\AcademicYear;
use App\Http\Requests\IdeaRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

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

    private $limit5 = " limit 0,5";
    private $orderByLikedCount = " order by liked_count desc";
    private $orderByCreatedDate = " order by ideas.created_date desc";

    public function index($id = "")
    {
        $data = '';
        if (!empty($id)) {
            //Get By id
            $ideas = Ideas::find($id);
        } else {
            //Get all idea list
            $ideas = Ideas::with('user', 'category')->simplePaginate(5);
        }

        if (is_null($ideas)) {
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
            if ($academicEndDate < date('Y-m-d H:i:s')) {
                $data = "dacademic year";
                $message = "CLOUSRE_DATE_REACH";
                $responseCode = 405;
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
}
