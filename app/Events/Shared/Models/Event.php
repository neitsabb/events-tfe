<?php

namespace App\Events\Shared\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'location',
        'price',
        'currency',
        'status',
        'user_id'
    ];
}
