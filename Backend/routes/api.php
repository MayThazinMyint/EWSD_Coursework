<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\dummyAPI;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use Routes\config\auth;
use App\Http\Controllers\DepartmentsController;

Route::get('data', [dummyAPI::class, 'getData']);
Route::apiResource('users', UserController::class);
Route::get('users', [UserController::class, 'index']);
Route::get('departments', [DepartmentsController::class, 'index']);
Route::post('department/add', [DepartmentsController::class, 'store']);

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('users', [UserController::class, 'index']);
    Route::get('dummy', [dummyAPI::class, 'getUsers']);
    // Department
    //Department
    Route::get('departments', [DepartmentsController::class, 'index']);
    Route::post('department/add', [DepartmentsController::class, 'store']);

    // department update >> http://localhost:8000/api/department_update/{department_id_to_update}
    // request body >> {"department_code": "Testing2","department_description": "Testing2"}
    Route::post('department/update/{id}', [DepartmentsController::class, 'update']);
    Route::delete('department/delete/{id}', [DepartmentsController::class, 'destroy']);

    // Category
    Route::get('category_lists', [CategoryController::class, 'index']);
    Route::post('category_add', [CategoryController::class, 'store']);
    Route::post('category_delete/{id}', [CategoryController::class, 'destroy']);
});
