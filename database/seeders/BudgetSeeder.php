<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Budget;
use App\Models\Budgets;

class BudgetSeeder extends Seeder
{
    public function run()
    {
        // Puedes crear múltiples budgets de prueba
        Budgets::create([
            'user_id' => 1, // Ajusta el ID según tus usuarios de prueba
            'categoria' => 'Vivienda',
            'monto_limite' => 800.00,
            'periodo' => 'mensual',
        ]);

        Budgets::create([
            'user_id' => 1,
            'categoria' => 'Alimentación',
            'monto_limite' => 400.00,
            'periodo' => 'mensual',
        ]);

        Budgets::create([
            'user_id' => 1,
            'categoria' => 'Transporte',
            'monto_limite' => 200.00,
            'periodo' => 'mensual',
        ]);
    }
}
