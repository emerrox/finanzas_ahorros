<?php

namespace App\Http\Controllers;

use App\Models\transactions;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class transactionsController extends Controller
{
    public function index()
    {
        return Inertia::render('Transactions', [
            'transactions' => transactions::with('user')->latest()->get()->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'tipo' => $transaction->tipo,
                    'monto' => $transaction->monto,
                    'fecha' => $transaction->fecha->toDateString(),
                    'categoria' => $transaction->categoria,
                    'descripcion' => $transaction->descripcion,
                    'user' => $transaction->user ? [
                        'name' => $transaction->user->name,
                        'email' => $transaction->user->email
                    ] : null
                ];
            })
        ]);
    }

    public function show($id)
    {
        $transactions = Transactions::findOrFail($id);
        return response()->json($transactions);
    }

    public function update(Request $request, $id)
    {
        $transactions = Transactions::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'tipo'=> 'sometimes|string|max:255',
            'monto'=> 'sometimes|numeric|gt:0',
            'fecha'=> 'sometimes|date',
            'categoria'=> 'sometimes|string|max:255',
            'descripcion'=> 'sometimes|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors'  => $validator->errors(),
            ], 400);
        }

        $data=$request->all();
        $transactions->update($data);

        return response()->json([
            'message' => 'Transaccion actualizada correctamente.',
            'Transactions'    => $transactions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'tipo' => 'required|string|in:ingreso,gasto',
            'monto' => 'required|numeric|min:0.01',
            'fecha' => 'required|date',
            'categoria' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ]);
    
        $transaction = $request->user()->transactions()->create($validated);
    
        return redirect()->back()->with([
            'success' => 'Transacción creada exitosamente',
            'transaction' => $transaction
        ]);
    }

    public function destroy($id)
    {
        $transactions = Transactions::findOrFail($id);
        $transactions->delete();

        Inertia::render('Transactions', [
            'transactions' => Transactions::with('user')->latest()->get()->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'tipo' => $transaction->tipo,
                    'monto' => $transaction->monto,
                    'fecha' => $transaction->fecha->toDateString(),
                    'categoria' => $transaction->categoria,
                    'descripcion' => $transaction->descripcion,
                    'user' => $transaction->user ? [
                        'name' => $transaction->user->name,
                        'email' => $transaction->user->email
                    ] : null
                ];
            })
        ]);
    }
}
