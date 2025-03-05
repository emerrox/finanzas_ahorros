<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser() {
        $user = User::all();
        return response()->json(json_encode($user));
    }
}
