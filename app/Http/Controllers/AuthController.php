<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('Login');
    }


    public function register(Request $request)
    {
        // Validar los datos
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'fecha_nacimiento' => 'sometimes|date',
            'ubicacion' => 'sometimes|string',
            'perfil_riesgo' => 'sometimes|in:conservador,moderado,agresivo',
            'idioma' => 'sometimes|string',
            'moneda' => 'sometimes|in:euro,dolar,libra',
        ]);
    
        // Crear el usuario
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']), // Asegúrate de encriptar la contraseña
            'fecha_nacimiento' => $validated['fecha_nacimiento'] ?? null,
            'ubicacion' => $validated['ubicacion'] ?? null,
            'perfil_riesgo' => $validated['perfil_riesgo'] ?? 'conservador',
            'idioma' => $validated['idioma'] ?? 'es',
            'moneda' => $validated['moneda'] ?? 'euro',
        ]);
    
        // Autenticar al usuario
        Auth::login($user);
    
        // Regenerar la sesión
        $request->session()->regenerate();
    
        // Redirigir al dashboard
        return redirect()->intended(route('dashboard'));
    }

    public function store(LoginRequest $request)
    {
        $request->authenticate();   
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard'));
    }

    public function destroy(Request $request)
    {
        auth()->guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
