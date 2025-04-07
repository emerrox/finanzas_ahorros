<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

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
    protected $casts = [
        'fecha' => 'date',
    ];
    
    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }



}
