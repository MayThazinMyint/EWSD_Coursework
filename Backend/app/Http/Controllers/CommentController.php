<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;
use Carbon\Carbon;
use DB;
use App\Helpers\EmailHelper;


class CommentController extends Controller
{
    public function index($idea_id)
    {
        try {
            $comments = Comment::where("idea_id", $idea_id)->get();
            $modifiedComments = $comments->map(function ($comment, $key) {
                $user = User::find($comment->user_id);
                $comment['user_name'] = $user->user_name;
                return $comment;
            });
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        // Return Json Response
        return response()->json([
            'message' => "success",
            'message' => "SUCCESS",
            'data' => $modifiedComments
        ], 200);
    }

    public function store(Request $request)
    {
        $data = "";
        $message = "";
        $responseCode = 200;

        try {
            $today = Carbon::now()->format('Y-m-d H:i:s');
            $commenter = User::find($request->user_id);
            // $user = Idea::find($request->user_id);
            //Add new comment
            $comment = Comment::create([
                'comment_description' => $request->comment_description,
                'is_anonymous' => $request->is_anonymous,
                'user_id' => $request->user_id,
                'idea_id' => $request->idea_id,
                'created_date' => $today,
                'updated_date' => $today
            ]);

            $data = $comment;
            $message = "SUCCESS";
            $responseCode = 200;

            EmailHelper::sendEmail(
                $name = "Manager", // todo here change name
                $subject = "$commenter->user_name commented to idea $request->idea_id",
                $receiptEmail = "vanzar2017@gmail.com", // todo here change email
                $description = "$commenter->user_name commented to idea $request->idea_id, \n'$request->comment_description'"
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

    public function update(Request $request, $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            // Find Department
            $comment = Comment::find($id);
            if (!$comment) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {

                $comment->comment_description = $request->comment_description;
                $comment->is_anonymous = $request->is_anonymous;
                // $comment->idea_id = $request->idea_id;
                // $comment->user_id = $request->user_id;
                $comment->updated_date = date('Y-m-d H:i:s');
                // Update Comment 
                $comment->save();
            }
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

    public function destroy(Request $request, $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            // Find Comment
            $comment = Comment::find($id);
            if (!$comment) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {
                // Delete 
                $data = "deleted comment id :$id";
                $comment->delete();
            }
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
