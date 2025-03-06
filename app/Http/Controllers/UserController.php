<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }


    public function show($id)
    {
        $user = User::findOrFail($id);
        $transaction_total = $user->gastosTotalesPorMes();
        return response()->json([
            'transaccion_total' => $transaction_total,
            'user'=> $user
        ]
        );
    }


    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'sometimes|string|min:8|confirmed',
            'fecha_nacimiento'=> 'sometimes|date',
            'ubicacion' => 'sometimes|string|max:255',
            'perfil_riesgo' => 'sometimes|in:conservador,moderado,agresivo',
            'idioma' => 'sometimes|string|max:10',
            'moneda' => 'sometimes|string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors'  => $validator->errors(),
            ], 400);
        }
        $data=$request->all();
        $user->update($data);

        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'user'    => $user,
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente.',
        ]);
    }

}
