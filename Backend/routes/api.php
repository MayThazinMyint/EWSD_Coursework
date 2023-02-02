<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\dummyAPI;

Route::apiResource('users', UserController::class);

Route::get('data', [dummyAPI::class, 'getData']);

Route::get('users', [dummyAPI::class, 'getUsers']);
