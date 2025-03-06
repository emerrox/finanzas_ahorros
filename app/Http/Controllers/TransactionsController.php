<?php

namespace App\Http\Controllers;

use App\Models\transactions;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class transactionsController extends Controller
{
    public function index()
    {
        $transactions = transactions::all();
        return response()->json($transactions);
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
        $validator = Validator::make($request->all(), [
            'user_id'=> 'required|exists:users,id',
            'tipo'=> 'required|string|max:255|in:ingreso,gasto',
            'monto'=> 'required|numeric|gt:0',
            'fecha'=> 'sometimes|date',
            'categoria'=> 'required|string|max:255',
            'descripcion'=> 'sometimes|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors'  => $validator->errors(),
            ], 400);
        }

        $transactions = Transactions::create($request->all());

        return response()->json([
            'message' => 'Transaccion creada correctamente.',
            'Transactions' => $transactions,
        ]);
    }

    public function destroy($id)
    {
        $transactions = Transactions::findOrFail($id);
        $transactions->delete();

        return response()->json([
            'message' => 'Transaccion eliminada correctamente.',
        ]);
    }
}
