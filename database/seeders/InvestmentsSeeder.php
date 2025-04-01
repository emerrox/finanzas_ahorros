<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Investments;
use Carbon\Carbon;

class InvestmentsSeeder extends Seeder
{
    public function run()
    {
        // Inversión de ejemplo 1: Apple Inc.
        Investments::create([
            'user_id'           => 1, // Asegúrate de que este usuario exista
            'nombre_activo'     => 'Apple Inc.',
            'fecha_adquisicion' => Carbon::now()->subDays(90)->toDateString(),
            'precio_compra'     => 150.00,
            'broker'            => 'E-Trade',
            'notas'             => 'Inversión a largo plazo en tecnología',
            'horizonte'         => 'largo plazo',
            'objetivo'          => 'Crecimiento',
        ]);

        // Inversión de ejemplo 2: Tesla Inc.
        Investments::create([
            'user_id'           => 1,
            'nombre_activo'     => 'Tesla Inc.',
            'fecha_adquisicion' => Carbon::now()->subDays(60)->toDateString(),
            'precio_compra'     => 700.00,
            'broker'            => 'Robinhood',
            'notas'             => 'Apuesta en el sector eléctrico',
            'horizonte'         => 'largo plazo',
            'objetivo'          => 'Crecimiento',
        ]);

        // Inversión de ejemplo 3: Vanguard Total Stock Market ETF
        Investments::create([
            'user_id'           => 1,
            'nombre_activo'     => 'Vanguard Total Stock Market ETF',
            'fecha_adquisicion' => Carbon::now()->subDays(120)->toDateString(),
            'precio_compra'     => 220.00,
            'broker'            => 'Fidelity',
            'notas'             => 'Diversificación global',
            'horizonte'         => 'largo plazo',
            'objetivo'          => 'Diversificación',
        ]);
    }
}
