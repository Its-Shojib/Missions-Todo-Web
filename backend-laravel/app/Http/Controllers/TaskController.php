<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    //add task
    function addTask(Request $request)
{
    try {
        // Validate the request
        $validatedData = $request->validate([
            'title' => 'required|string|max:50',
            'email' => 'required|email',
            'completed' => 'required|boolean',
        ]);

        // Create a new task
        $task = new Tasks();
        $task->title = $validatedData['title'];
        $task->email = $validatedData['email'];
        $task->completed = $validatedData['completed'];

        if ($task->save()) {
            return response()->json([
                'message' => 'Task created successfully.',
                'task' => $task,
                "result" => true,
            ], 201);
        } else {
            // If the save operation fails
            return response()->json([
                'message' => 'Failed to save task.',
                "result" => false,
            ], 500);
        }
    } catch (ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'message' => 'Validation failed.',
            'errors' => $e->errors(),
            "result" => false,
        ], 200);
    } catch (\Exception $e) {
        // Handle other unexpected errors
        return response()->json([
            'message' => 'An unexpected error occurred.',
            'error' => $e->getMessage(),
            "result" => false,
        ], 500);
    }
}



    //load task based on email
    function loadTasksByEmail($email)
    {
        // Fetch tasks by email
        $tasks = Tasks::where('email', $email)->get();

        // Check if tasks exist
        if ($tasks->count() > 0) {
            return response()->json([
                'tasks' => $tasks,
                "result" => true,
            ], 200);
        }

        return response()->json([
            'message' => 'No tasks found for this email.',
            "result" => false,
        ], 200);
    }

    //update task completed or incompleted
    function updateTask($id)
    {
        // Fetch the task
        $task = Tasks::find($id);

        // Check if task exists
        if ($task) {
            $task->completed = !$task->completed;
            $task->save();

            return response()->json([
                'message' => 'Task updated successfully.',
                'task' => $task,
                "result" => true,
            ], 200);
        }

        return response()->json([
            'message' => 'Task not found.',
            "result" => false,
        ], 404);
    }

    //Delete the task
    function deleteTask($id)
    {
        // Fetch the task
        $task = Tasks::find($id);

        // Check if task exists
        if ($task) {
            $task->delete();

            return response()->json([
                'message' => 'Task deleted successfully.',
                "result" => true,
            ], 200);
        }

        return response()->json([
            'message' => 'Task not found.',
            "result" => false,
        ], 404);
    }
}
