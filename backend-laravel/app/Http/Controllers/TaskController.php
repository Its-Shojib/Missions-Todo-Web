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
}
