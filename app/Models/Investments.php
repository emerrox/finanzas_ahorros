<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investments extends Model
{
    protected $fillable = [
        'user_id',
        'nombre_activo',
        'fecha_adquisicion',
        'precio_compra',
        'broker',
        'notas',
        'horizonte',
        'objetivo'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
