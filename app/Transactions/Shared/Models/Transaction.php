<?php

namespace App\Transactions\Shared\Models;

use App\Events\Shared\Models\Event;
use App\Tickets\Shared\Models\Ticket;
use App\User\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Transaction extends Model
{
	use HasFactory;

	protected $fillable = [
		'user_id',
		'event_id',
		'amount',
		'paymentIntentId',
		'is_completed',
		'reference',
	];

	public static function generateReference(): string
	{
		return strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4));
	}

	public function event(): BelongsTo
	{
		return $this->belongsTo(Event::class);
	}

	public function tickets()
	{
		return $this->belongsToMany(Ticket::class, 'tickets_transactions')
			->withPivot('qr_code', 'id');
	}
	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}
}
