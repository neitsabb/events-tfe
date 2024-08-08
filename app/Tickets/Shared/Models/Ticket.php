<?php

namespace App\Tickets\Shared\Models;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Models\Sales;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'description',
        'quantity',
        'price',
        'event_id',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    // public function sale(): HasOne
    // {
    //     return $this->hasOne(Sales::class);
    // }
}
