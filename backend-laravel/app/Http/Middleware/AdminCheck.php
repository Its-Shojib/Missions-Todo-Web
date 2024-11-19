<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AdminCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //find user by email
        // Replace with actual logic to find user by email
        $user = User::where('email', $request->email)->first();
        if($user && $user->role=='admin'){
            return response()->json([
                "admin"=>"true",
                
            ]);
        }else{
            return response()->json(['message' => 'Admin access denied.'], 401);
        }

        return $next($request);
        // Check admin
        if ($request->email === 'admin@example.com') {
            return response()->json(['message' => 'Admin access granted.'], 200);
        }

        // Allow access to non-admin users
        if ($request->email) {
        }
        return $next($request);
    }
}
