<?php

namespace App\Http\Controllers;

use App\Models\Ideas;
use App\Models\Category;
use App\Models\User;
use App\Http\Requests\IdeaRequest;

class IdeasController extends Controller
{
    public function index($id = "")
    {
        $data = '';
        if (!empty($id)){
            //Get By id
            $ideas = Ideas::find($id);
        }
        else{
            //Get all idea list
            $ideas = Ideas::with('user', 'category')->simplePaginate(5);
        }
        
        if(is_null($ideas)){
            return response()->json([
                'data' => $id,
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
            // $data = Category::where([['category_id', $request->category_id], ['is_active', 1]])->category_code;
            //academicEndDate = Academic::select('select acdemic_edate from academic where academic_id = ?', [1])->pluck('acdemic_edate');

            // $academicEndDate = Academic::where(['academic_id', $request->academic_id])->value('academic_edate');
            //$data = $academicEndDate > date('y-m-d h:i:s');
            // if(!$academicEndDate){
            //     $data = "academic";
            //     $message = "NOT_FOUND";
            //     $responseCode = 404;
            //     goto RETURN_STATEMENT;
            // }
            // elseif ($academicEndDate) {

            // }
            // acdemic id does not exists
            //else if date < current date
            // cant
            //

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
                $getImage = $request->attachment;
                $imageName = strtoupper(md5(uniqid(rand(), true))) . '.' . $getImage->extension();
                $getImage->move('.' . env('POST_ATTACHMENT_PATH'), $imageName);
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
