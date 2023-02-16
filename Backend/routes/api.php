<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\dummyAPI;
use App\Http\Controllers\AuthController;
use Routes\config\auth;

Route::get('data', [dummyAPI::class, 'getData']);
Route::apiResource('users', UserController::class);
Route::get('users', [dummyAPI::class, 'getUsers']);

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth.jwt'], function () {
   
    Route::get('dummy', [dummyAPI::class, 'getUsers']);
});
 Route::get('users', [UserController::class, 'index']);