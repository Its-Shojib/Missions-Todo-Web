<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;

class TaskController extends Controller
{
    //add task
    function addTask(Request $request){
        // Validate the request
        $request->validate([
            'title' =>'required|string|max:255',
            'email' =>'required|string',
            'completed' => 'required',
        ]);

        // Create a new task
        $task = new Tasks();
        $task->title = $request->title;
        $task->email = $request->email;
        $task->completed = $request->completed;
        $task->save();

        return response()->json([
            'message' => 'Task created successfully.',
            'task' => $task,
            "result" => true,
        ], 201);

    }


    //load task based on email
    function loadTasksByEmail($email){
        // Fetch tasks by email
        $tasks = Tasks::where('email', $email)->get();

        // Check if tasks exist
        if($tasks->count() > 0){
            return response()->json([
                'tasks' => $tasks,
                "result" => true,
            ], 200);
        }

        return response()->json([
           'message' => 'No tasks found for this email.',
            "result" => false,
        ], 404);
    }
}


