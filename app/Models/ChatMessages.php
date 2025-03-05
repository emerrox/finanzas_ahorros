<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessages extends Model
{
    protected $fillable = [
        'user_id',
        'mensaje',
        'respuesta',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
