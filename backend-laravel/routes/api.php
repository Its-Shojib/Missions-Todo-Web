<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController; 
use App\Http\Controllers\TaskController; 


//authentication route
Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);

Route::get('/load-task/{email}', [TaskController::class, 'loadTasksByEmail']);

// Route::post('/add-task', [TaskController::class, 'addTask'])->withoutMiddleware(['auth:sanctum']);

//auth sanctum middlleware apply
Route::middleware(['auth:sanctum'])->group(function () {
    //load all user
    Route::get('/users', [UserController::class, 'loadAllUsers']);
    //load single user by id
    Route::get('/user/{id}', [UserController::class, 'loadSingleUser']);
    Route::post('/add-task', [TaskController::class, 'addTask']);
    //Update The task
    Route::put('/task/{id}', [TaskController::class, 'updateTask']);
    //Delete The task
    Route::delete('/task/{id}', [TaskController::class, 'deleteTask']);

});




