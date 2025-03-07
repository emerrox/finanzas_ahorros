<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        // el error esta en la validacion
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'fecha_nacimiento' => 'sometimes|date',
            'ubicacion' => 'sometimes|string',
            'perfil_riesgo' => 'sometimes|in:conservador,moderado,agresivo',
            'idioma' => 'sometimes|string',
            'moneda' => 'sometimes|in:euro,dolar,libra',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password'=> $validated['password'],
        ]);


        return response()->json([
            'message' => 'Usuario creado correctamente',
        ]);
    }

    public function login(Request $request) 
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas',
            ], 401);
        }
        
        // $token = $user->createToken($user->email . '-' . now())->plainTextValue;
        return response()->json([
            'message' => 'Autenticación correcta',
            // 'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        // $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}
