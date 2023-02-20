<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Carbon\Carbon;

class AuthController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

        /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = JWTAuth::user();
        
     return response()->json([
                'status' => 'success',
                'message' => 'User login successfully',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ]
            ]);

    }

    public function register(Request $request){

        $validator = validator($request->all(), [
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'user_role_id' => 'required|string|email|max:255|unique:users',
            'department_id' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',]);

        $credentials = $request->only('email', 'password');

        $dob = Carbon::parse($request->user_dob)->format('Y-m-d H:i:s');
        $today = Carbon::now()->format('Y-m-d H:i:s');
        $user = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'user_phone' => $request->user_phone,
            'address' => $request->address,
            'user_dob' => $dob,
            'is_active' => 1,
            'user_code' => $request->user_code,
            'department_id' => $request->department_id,
            'user_role_id' => $request->user_role_id,
            'password' => Hash::make($request->password),
            'created_date' => $today,
            'updated_date' => $today,
        ]);
        $token = JWTAuth::attempt($credentials);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ]);
    }

    public function logout()
    {
        JWTAuth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => JWTAuth::user(),
            'authorisation' => [
                'token' => JWTAuth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
