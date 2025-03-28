<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'fecha_nacimiento',
        'ubicacion',
        'perfil_riesgo',
        'idioma',
        'moneda',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(transactions::class);
    }

    public function budgets(): HasMany
    {
        return $this->hasMany(Budgets::class);
    }

    public function investments(): HasMany
    {
        return $this->hasMany(Investments::class);
    }

    public function chatMessages(): HasMany
    {
        return $this->hasMany(ChatMessages::class);
    }


    public function obtenerInversiones()
    {
        return $this->investments()->get();
    }

    public function resumenPorMes()
    {
        // Consulta global por mes
        $global = $this->transactions()
            ->selectRaw("
                strftime('%Y-%m', fecha) as year_month,
                SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as total_gastos,
                SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as total_ingresos
            ")
            ->groupBy('year_month')
            ->orderBy('year_month', 'asc')
            ->get();
    
        // Consulta detallada por categoría
        $desglose = $this->transactions()
            ->selectRaw("
                strftime('%Y-%m', fecha) as year_month,
                categoria,
                SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos,
                SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos
            ")
            ->groupBy(DB::raw("year_month, categoria"))
            ->orderBy('year_month', 'asc')
            ->orderBy('categoria', 'asc')
            ->get();
    
        // Estructurar los resultados
        $result = [];
        foreach ($global as $item) {
            $result[$item->year_month] = [
                'year_month'      => $item->year_month,
                'total_gastos'    => $item->total_gastos,
                'total_ingresos'  => $item->total_ingresos,
                'desglose'        => []
            ];
        }
    
        foreach ($desglose as $d) {
            if (isset($result[$d->year_month])) {
                $result[$d->year_month]['desglose'][] = [
                    'categoria' => $d->categoria,
                    'gastos'    => $d->gastos,
                    'ingresos'  => $d->ingresos,
                ];
            }
        }
    
        return array_values($result);
    }

    public function ultimasTransacciones()
{
    return $this->transactions()
        ->orderByDesc('fecha')  // Ordenar por fecha descendente
        ->limit(6)             // Limitar a 7 registros
        ->get();
}

public function presupuestoPorCategoria()
{
    // Primero obtenemos los presupuestos agrupados por categoría.
    $budgets = $this->budgets()
        ->select('categoria', 'periodo', 'monto_limite')
        ->groupBy('categoria')
        ->get();

    // Para cada presupuesto, calculamos lo gastado y lo recibido en el periodo indicado.
    $result = $budgets->map(function($budget) {
        // Determinar el rango de fechas según el período.
        if ($budget->periodo === 'mensual') {
            $start = now()->startOfMonth()->toDateString();
            $end = now()->endOfMonth()->toDateString();
        } elseif ($budget->periodo === 'anual') {
            $start = now()->startOfYear()->toDateString();
            $end = now()->endOfYear()->toDateString();
        } else {
            // Por defecto, usamos el mes actual.
            $start = now()->startOfMonth()->toDateString();
            $end = now()->endOfMonth()->toDateString();
        }

        // Consultar las transacciones del usuario para la categoría y dentro del rango de fechas.
        $sums = $this->transactions()
            ->where('categoria', $budget->categoria)
            ->whereBetween('fecha', [$start, $end])
            ->selectRaw("
                SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos,
                SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos
            ")
            ->first();

        // Asignar los resultados al presupuesto.
        $budget->gastos = $sums->gastos ?? 0;
        $budget->ingresos = $sums->ingresos ?? 0;
        return $budget;
    });

    return $result;
}



    
}
