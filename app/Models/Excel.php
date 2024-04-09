<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Excel extends Model
{
    use HasFactory;

    public function timeSeries()
    {
        return $this->hasMany(TimeSeries::class);
    }
}
