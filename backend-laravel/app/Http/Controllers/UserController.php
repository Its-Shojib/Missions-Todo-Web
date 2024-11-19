<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //signup User
    public function signup(Request $request){
        // Validate the request
        $request->validate([
            'name' =>'required|string|max:255',
            'email' =>'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        //create token
        $token = $user->createToken('authToken')->plainTextToken;

        // Return a success response with the token
        return response()->json([
           'message' => 'User created successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    //login User
    public function login(Request $request){
        //check email
        $user = User::where('email', $request->email)->first();

        //if user exists and password matches
        if($user && Hash::check($request->password, $user->password)){
            //create token
            $token = $user->createToken('authToken')->plainTextToken;

            //return success response with token
            return response()->json([
               'message' => 'User logged in successfully',
                'user' => $user,
                'token' => $token
            ], 200);
        }

        //if user not found or password does not match
        return response()->json([
           'message' => 'Invalid email or password'
        ], 401); 
    }

    //load all user
    public function loadAllUsers(){
        $users = User::all();
        return response()->json([
            'users' => $users
        ], 200);
    }
}