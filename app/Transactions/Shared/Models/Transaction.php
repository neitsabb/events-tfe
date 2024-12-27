<?php

namespace App\Transactions\Shared\Models;

use App\Events\Shared\Models\Event;
use App\User\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
	use HasFactory;

	protected $fillable = [
		'user_id',
		'event_id',
		'amount',
		'paymentIntentId',
		'is_completed',
	];

	public function event(): BelongsTo
	{
		return $this->belongsTo(Event::class);
	}

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}
}
