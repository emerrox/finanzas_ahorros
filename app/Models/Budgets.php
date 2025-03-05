<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budgets extends Model
{
    protected $fillable = [
        'user_id',
        'categoria',
        'monto_limite',
        'periodo',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
