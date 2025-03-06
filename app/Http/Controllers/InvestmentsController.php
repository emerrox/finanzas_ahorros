<?php

namespace App\Http\Controllers;

use App\Models\Investments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InvestmentsController extends Controller
{
    public function index()
    {
        $investments = Investments::all();
        return response()->json($investments);
    }

    public function show($id)
    {
        $investments = Investments::findOrFail($id);
        return response()->json($investments);
    }

    public function update(Request $request, $id)
    {
        $investments = Investments::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nombre_activo'=> 'sometimes|string|max:255',
            'precio_compra'=> 'sometimes|numeric|gt:0',
            'fecha_adquisicion'=> 'sometimes|date',
            'broker'=> 'sometimes|string|max:255',
            'notas'=> 'sometimes|string|max:255',
            'horizonte'=> 'sometimes|in:corto plazo,mediano plazo,largo plazo',
            'objetivo'=> 'sometimes|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors'  => $validator->errors(),
            ], 400);
        }

        $data=$request->all();
        $investments->update($data);

        return response()->json([
            'message' => 'Inversion actualizada correctamente.',
            'Investments'    => $investments,
        ]);
    }

    public function store(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'user_id'=> 'required|exists:users,id',
            'nombre_activo'=> 'required|string|max:255',
            'precio_compra'=> 'required|numeric|gt:0',
            'fecha_adquisicion'=> 'sometimes|date',
            'broker'=> 'sometimes|string|max:255',
            'notas'=> 'sometimes|string|max:255',
            'horizonte'=> 'required|in:corto plazo,mediano plazo,largo plazo',
            'objetivo'=> 'sometimes|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors'  => $validator->errors(),
            ], 400);
        }

        $investments = Investments::create($request->all());

        return response()->json([
            'message' => 'Inversion creada correctamente.',
            'Investments' => $investments,
        ]);
    }

    public function destroy($id)
    {
        $investments = Investments::findOrFail($id);
        $investments->delete();

        return response()->json([
            'message' => 'Inversion eliminada correctamente.',
        ]);
    }
}
