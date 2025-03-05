<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class transactions extends Model
{
    protected $fillable = [
        'user_id',
        'tipo',
        'monto',
        'fecha',
        'categoria',
        'descripcion',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
