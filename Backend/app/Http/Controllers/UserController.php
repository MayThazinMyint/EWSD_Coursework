<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return UserResourceCollection
     */
    public function index()
    {
        // $users = User::orderByDesc('id')->simplePaginate(10);
        // return new UserResourceCollection($users);
        $users = User::where('is_active', 1)->get();
        $modifiedUsers = $users->map(function ($user, $key) {
            $user['department_name'] = $user->department->department_description;
            $user['user_role_name'] = $user->user_role->user_role_description;
            return $user;
        });

        // Return Json Response
        return response()->json([
            'message' => "success",
            'message' => "SUCCESS",
            'data' => $modifiedUsers
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserRegisterRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => __('messages.users.create_success'),
            'data' => new UserResource($user)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return UserResource
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function getUserByID(Request $request, int $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            // Find Department
            $user = User::find($id);
            if (!$user) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {
                // Check new department code already exists
                $user->department_name = $user->department->department_description;
                $user->user_role_name = $user->user_role->user_role_description;
                $data = $user;
                $message = "SUCCESS";
                $responseCode = 200;
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
    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            // Find Department
            $user = User::find($id);
            if (!$user) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {
                // Check new department code already exists
                if (User::where('id', $request->id)->count() > 1) {
                    $data = $request->id;
                    $message = "DUPLICATE";
                    $responseCode = 302;
                } else {

                    $today = Carbon::now()->format('Y-m-d H:i:s');
                    $dob = Carbon::parse($request->user_dob)->format('Y-m-d H:i:s');
                    // $user->$request->id->toInt();
                    $user->user_name = $request->user_name;
                    $user->email = $request->email;
                    $user->user_phone = $request->user_phone;
                    $user->address = $request->address;
                    $user->user_dob = $dob;
                    $user->is_active = $request->isActive;
                    $user->user_code =  $request->user_code;
                    $user->department_id = $request->department_id;
                    $user->user_role_id = $request->user_role_id;
                    $user->password = Hash::make($request->password);
                    $user->updated_date = $today;
                    $user->updated_date = date('Y-m-d H:i:s');

                    // Update Department 
                    $user->save();
                }
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

        User::where('id', $id)->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => __('messages.users.update_success')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;
        try {
            // Find Category
            $user = User::find($id);
            $data = $id;
            if (!$user) {

                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {
                // Update Is_Active to 0 and updated date to current date
                $user->is_active = 0;
                $user->updated_date = date('Y-m-d H:i:s');
                // Update 
                $user->save();
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
