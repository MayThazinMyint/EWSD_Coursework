<?php

namespace App\Http\Controllers;

use App\Models\Voting;
use App\Models\Ideas;
use App\Models\User;
use Illuminate\Http\Request;

class VotingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function vote(Request $request)
    {
        $ideaID = $request->idea_id;
        $userID = $request->user_id;

        $data = "";
        $message = "";
        $responseCode = 200;

        try
        {
            //check idea exists
            $idea = Ideas::find($request->idea_id);
            if(!$idea)
            {
                $data = $ideaID;
                $message = "Idea NOT_FOUND";
                $responseCode = 404;
            }
            else
            {
                //check user exists
                $user = User::where('id', $userID)
                    ->where('is_active', 1)->first();
                if(!$user)
                {
                    $data = $userID;
                    $message = "User NOT_FOUND";
                    $responseCode = 404;
                } else
                {
                    $count = Voting::where('user_id', $userID)
                        ->where('idea_id', $ideaID)->count();

                    if($count > 0)
                    {
                        $data = $ideaID;
                        $message = "DUPLICATE";
                        $responseCode = 403;
                    } else 
                    {
                        $voting = Voting::create([
                            'idea_id' => $ideaID,
                            'user_id' => $userID,
                            'is_liked' => $request->is_liked,
                            'is_unliked' => $request->is_unliked
                        ]);

                        $data = $voting->voting_id;
                        $message = "SUCCESS";
                        $responseCode = 200;
                    }
                }
            }
            
        } catch (\Throwable $th) 
        {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }
        
        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }

    public function total_voting(Request $request)
    {
        $data = "";
        $message = "";
        $responseCode = 200;
        
        $total_like = 0;
        $total_dislike = 0;
        $is_user_liked = 0;
        $is_user_unliked = 0;
        try
        {
            $total_like = Voting::where('idea_id', $request->idea_id)->where('is_liked', 1)->count();

            $total_dislike = Voting::where('idea_id', $request->idea_id)->where('is_unliked', 1)->count();

            $is_user_liked = Voting::select('is_liked', 'is_unliked')->where('idea_id', $request->idea_id)
                            ->where('user_id', $request->user_id)->first();
            
        } catch (\Throwable $th) 
        {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        return response()->json([
            'total_like' => $total_like,
            'total_dislike' => $total_dislike,
            'is_user_liked' => $is_user_liked
        ], $responseCode);
    }    
}
