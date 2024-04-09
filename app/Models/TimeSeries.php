<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class TimeSeries extends Model
{
    use HasFactory;
    protected $fillable = ['x', 'y', 'status', 'excel_id'];


    public function excel()
    {
        return $this->belongsTo(Excel::class);
    }
}
