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
            'categoria' => 'Ocio',
            'monto_limite' => 1500.00,
            'periodo' => 'mensual',
        ]);

    }
}
