<?php

namespace App\Http\Controllers;

use App\Models\Budgets;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetsController extends Controller
{
    public function index()
    {
        return Inertia::render('Budgets', [
            'budgets' => Budgets::with('user')->latest()->get()->map(function ($budget) {
                return [
                    'id' => $budget->id,
                    'user_id' => $budget->user_id,
                    'categoria' => $budget->categoria,
                    'monto_limite' => $budget->monto_limite,
                    'periodo' => $budget->periodo,
                    'user' => $budget->user ? [
                        'name' => $budget->user->name,
                        'email' => $budget->user->email
                    ] : null
                ];
            })
        ]);
    }

    public function show($id)
    {
        $budgets = Budgets::findOrFail($id);
        return response()->json($budgets);
    }

    public function update(Request $request, $id)
    {
        $budgets = Budgets::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id'=> 'required|exists:users,id',
            'categoria'=> 'sometimes|string|max:255',
            'monto_limite'=> 'sometimes|numeric|gt:0',
            'periodo'=> 'sometimes|in:diario,semanal,mensual,anual',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors'  => $validator->errors(),
            ], 400);
        }

        $data=$request->all();
        $budgets->update($data);

        return response()->json([
            'message' => 'Presupuesto actualizado correctamente.',
            'Budgets'    => $budgets,
        ]);
    }

    public function store(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'user_id'=> 'required|exists:users,id',
            'categoria'=> 'required|string|max:255',
            'monto_limite'=> 'required|numeric|gt:0',
            'periodo'=> 'sometimes|in:diario,semanal,mensual,anual',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors'  => $validator->errors(),
            ], 400);
        }

        $budgets = Budgets::create($request->all());

        return response()->json([
            'message' => 'Presupuesto creado correctamente.',
            'Budgets' => $budgets,
        ]);
    }

    public function destroy($id)
    {
        $budgets = Budgets::findOrFail($id);
        $budgets->delete();

        return response()->json([
            'message' => 'Presupuesto eliminado correctamente.',
        ]);
    }
}
