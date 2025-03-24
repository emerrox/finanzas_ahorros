<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\transactions;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    public function run()
    {
        // Define las categorías y sus montos de ejemplo
        $categories = [
            'Vivienda' => 1200.00,
            'Alimentación' => 400.00,
            'Transporte' => 150.00,
            'Salud' => 100.00,
            'Ocio' => 200.00,
        ];

        // Suponiendo que el usuario con ID 1 existe en la base de datos.
        foreach ($categories as $category => $amount) {
            transactions::create([
                'user_id'     => 1,
                'tipo'        => 'gasto',
                'monto'       => $amount,
                // Se asigna una fecha aleatoria en los últimos 30 días
                'fecha'       => Carbon::now()->subDays(rand(1, 30))->toDateString(),
                'categoria'   => $category,
                'descripcion' => "Gasto de ejemplo para {$category}",
            ]);
        }
    }
}
