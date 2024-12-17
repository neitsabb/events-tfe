<?php

namespace App\Events\Shared\Models;

use Illuminate\Database\Eloquent\Model;

class EventTag extends Model
{
	protected $fillable = ['event_id', 'name', 'slug'];

	public function event()
	{
		return $this->belongsTo(Event::class);
	}
}
