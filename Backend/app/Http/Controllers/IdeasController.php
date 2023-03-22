<?php

namespace App\Http\Controllers;

use App\Models\Ideas;
use App\Models\Category;
use App\Models\User;
use App\Models\AcademicYear;
use App\Http\Requests\IdeaRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class IdeasController extends Controller
{
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
        $data = '';

        $getBy = $request->getBy;

        switch ($getBy) {
            case 'popular':
                //$ideas = DB::select('select * from ideas')->simplePaginate(5);
                break;
            case 'latest':
                $ideas = Ideas::with('user', 'category')->orderByDesc('created_date')->simplePaginate(5);
                break;
            case 'byDepartment':
                $ideas = Ideas::addSelect([
                    'user_id' => User::select('department_id')
                        ->whereColumn('department_id', 'ideas.user_id')
                ])->get();
                break;
            default:
                $ideas = Ideas::with('user', 'category')->simplePaginate(5);
                break;
        }

        if (is_null($ideas)) {
            return response()->json([
                'data' => $getBy,
                'message' => "NOT_FOUND"
            ], 404);
        }

        foreach ($ideas as $idea) {
            if (!empty($idea->file_path)) {
                $idea['attachment'] = asset(env('POST_ATTACHMENT_PATH') . "/" . $idea->file_path);
                $data = $data . $idea->file_path;
            }
        }
        // Return Json Response
        return response()->json([
            'data' => $ideas,
            'message' => "SUCCESS"
        ], 200);
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
}
