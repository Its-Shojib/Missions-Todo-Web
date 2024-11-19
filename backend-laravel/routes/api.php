<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


//authentication route
Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);

//auth sanctum middlleware apply
Route::middleware(['auth:sanctum'])->group(function () {
    //load all user
    Route::get('/users', [UserController::class, 'loadAllUsers']);
    //load single user by id
    Route::get('/user/{id}', [UserController::class, 'loadSingleUser']);

});


