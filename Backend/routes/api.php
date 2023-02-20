<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\dummyAPI;
use App\Http\Controllers\AuthController;
use Routes\config\auth;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\CategoryController;

Route::get('data', [dummyAPI::class, 'getData']);
Route::apiResource('users', UserController::class);
Route::get('users', [dummyAPI::class, 'getUsers']);

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('users', [UserController::class, 'index']);
    Route::get('dummy', [dummyAPI::class, 'getUsers']);
});

//Department
Route::get('department_list', [DepartmentsController::class, 'index']);
Route::post('department_add', [DepartmentsController::class, 'store']);

// department update >> http://localhost:8000/api/department_update/{department_id_to_update}
// request body >> {"department_code": "Testing2","department_description": "Testing2"}
Route::post('department_update/{id}', [DepartmentsController::class, 'update']);

// department delete >> http://localhost:8000/api/department_delete/{department_id_to_delete}
Route::delete('department_delete/{id}', [DepartmentsController::class, 'destroy']);

//Route::apiResource('categories', CategoryController::class);

Route::get('category_lists', [CategoryController::class, 'index']);
Route::post('category_add', [CategoryController::class, 'store']);
Route::post('category_delete/{id}', [CategoryController::class, 'destroy']);
