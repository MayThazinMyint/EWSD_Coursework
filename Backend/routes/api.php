<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\dummyAPI;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DepartmentsController;

Route::get('data', [dummyAPI::class, 'getData']);
Route::apiResource('users', UserController::class);
Route::get('users', [dummyAPI::class, 'getUsers']);

// Comment
Route::get('comment/{idea_id}', [CommentController::class, 'index']);
Route::post('comment/add', [CommentController::class, 'store']);
Route::post('comment/update/{id}', [CommentController::class, 'update']);
Route::post('comment/delete/{id}', [CommentController::class, 'destroy']);

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth.jwt'], function () {

    // user
    Route::get('users', [UserController::class, 'index']);
    Route::post('user/update/{id}', [UserController::class, 'update']);
    Route::post('user/{id}', [UserController::class, 'getUserByID']);
    Route::post('user/delete/{id}', [UserController::class, 'destroy']);

    //Department
    Route::get('departments', [DepartmentsController::class, 'index']);
    Route::post('department/add', [DepartmentsController::class, 'store']);
    Route::post('department/update/{id}', [DepartmentsController::class, 'update']);
    Route::delete('department/delete/{id}', [DepartmentsController::class, 'destroy']);

    // Category
    Route::get('category_lists', [CategoryController::class, 'index']);
    Route::post('category_add', [CategoryController::class, 'store']);
    Route::post('category_delete/{id}', [CategoryController::class, 'destroy']);

    // Comment
    Route::get('comment/{idea_id}', [CommentController::class, 'index']);
    Route::post('comment/add', [CommentController::class, 'store']);
    Route::post('comment/update/{id}', [CommentController::class, 'update']);
    Route::post('comment/delete/{id}', [CommentController::class, 'destroy']);
});
