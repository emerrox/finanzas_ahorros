<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


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
        $global = $this->transactions()
            ->selectRaw("
                fecha,
                substr(fecha, 1, 7) as year_month, 
                SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as total_gastos,
                SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as total_ingresos
            ")
            ->groupBy('year_month')
            ->orderBy('year_month', 'asc')
            ->get();

        $desglose = $this->transactions()
            ->selectRaw("
                fecha, 
                categoria,
                SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos,
                SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos
            ")
            ->groupBy('fecha', 'categoria')
            ->orderBy('fecha', 'asc')
            ->orderBy('categoria', 'asc')
            ->get();

        $result = [];
        foreach ($global as $item) {
            $result[$item->fecha] = [
                'year_month'      => $item->year_month,
                'total_gastos'    => $item->total_gastos,
                'total_ingresos'  => $item->total_ingresos,
                'desglose'        => []
            ];
        }

        foreach ($desglose as $d) {
            if (isset($result[$d->fecha])) {
                $result[$d->fecha]['desglose'][] = [
                    'categoria'=> $d->categoria,
                    'gastos'   => $d->gastos,
                    'ingresos' => $d->ingresos,
                ];
            }
        }

        return array_values($result);
    }

    public function presupuestoPorCategoria()
    {
        $presupuesto = $this->budgets()
            ->select(
                'categoria',
                'monto_limite'
            )
            ->groupBy('categoria')
            ->get();

        return $presupuesto;
    }


    
}
