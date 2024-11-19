<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //signup User
    public function signup(Request $request){
        // Validate the request
        $request->validate([
            'name' =>'required|string|max:255',
            'email' =>'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Return a success response
        return response()->json([
           'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }


    //login User
    public function login(Request $request){
        // Validate the request
        $request->validate([
            'email' =>'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if(auth()->attempt(['email' => $request->email, 'password' => $request->password])){
            // Generate a token for the user
            $token = auth()->user()->createToken('authToken')->plainTextToken;

            // Return a success response with the token
            return response()->json([
               'message' => 'User authenticated successfully',
                'token' => $token
            ], 200);
        } else {
            // Return an error response if the authentication fails
            return response()->json([
               'message' => 'Invalid credentials'
            ], 401);
        }
    }
}
