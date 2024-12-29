<?php

namespace App\Tickets\Shared\Models;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Models\Sales;
use App\Transactions\Shared\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'description',
        'quantity',
        'sold',
        'price',
        'event_id',
    ];

    protected $casts = [
        'price' => 'float',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function transactions(): BelongsToMany
    {
        return $this->belongsToMany(Transaction::class, 'tickets_transactions')
            ->withPivot('qr_code');
    }

    // public function sale(): HasOne
    // {
    //     return $this->hasOne(Sales::class);
    // }
}
