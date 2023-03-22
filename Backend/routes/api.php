<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\dummyAPI;
use App\Http\Controllers\AuthController;
use Routes\config\auth;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\IdeasController;
use App\Http\Controllers\VotingController;

Route::get('data', [dummyAPI::class, 'getData']);
Route::apiResource('users', UserController::class);
Route::get('users', [dummyAPI::class, 'getUsers']);

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('users', [UserController::class, 'index']);
    Route::post('user/update/{id}', [UserController::class, 'update']);
    Route::delete('user/delete/{id}', [UserController::class, 'destroy']);
    Route::get('user/{id}', [UserController::class, 'getUserByID']);

    //Department
    Route::get('departments', [DepartmentsController::class, 'index']);
    Route::post('department/add', [DepartmentsController::class, 'store']);
    Route::post('department/update/{id}', [DepartmentsController::class, 'update']);
    Route::delete('department/delete/{id}', [DepartmentsController::class, 'destroy']);

    // Category
    Route::get('category_lists', [CategoryController::class, 'index']);
    Route::post('category_add', [CategoryController::class, 'store']);
    Route::delete('category_delete/{id}', [CategoryController::class, 'destroy']);

    //Idea
    Route::get('ideas', [IdeasController::class, 'index']);
    Route::get('ideas/{id}', [IdeasController::class, 'index']);
    Route::post('ideas/add', [IdeasController::class, 'store']);
    Route::post('ideas/update/{id}', [IdeasController::class, 'update']);
    Route::get('ideas_list/{getBy}', [IdeasController::class, 'listGetBy']);

    //Comment    
    Route::get('comment/{idea_id}', [CommentController::class, 'index']);
    Route::get('comment/add', [CommentController::class, 'store']);
    Route::post('comment/delete/{id}', [CommentController::class, 'destroy']);
    Route::post('comment/update/{id}', [CommentController::class, 'update']);

    //Academic
    Route::get('academic_years', [AcademicYearController::class, 'index']);
    Route::post('academic_year/add', [AcademicYearController::class, 'store']);
    Route::post('academic_year/{id}', [AcademicYearController::class, 'destroy']);

    //Voting
    Route::post('voting', [VotingController::class, 'vote']);
});