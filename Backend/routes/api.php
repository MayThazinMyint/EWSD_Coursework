<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\dummyAPI;
use App\Http\Controllers\AuthController;
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
   
    Route::get('dummy', [dummyAPI::class, 'getUsers']);
    // Department
    //Department
    //Route::get('departments', [DepartmentsController::class, 'index']);
   
    // department update >> http://localhost:8000/api/department_update/{department_id_to_update}
    // request body >> {"department_code": "Testing2","department_description": "Testing2"}
    Route::post('department/update/{id}', [DepartmentsController::class, 'update']);

    // department delete >> http://localhost:8000/api/department_delete/{department_id_to_delete}
    Route::delete('department/delete/{id}', [DepartmentsController::class, 'destroy']);
    });
