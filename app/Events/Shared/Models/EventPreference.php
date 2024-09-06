<?php

namespace App\Events\Shared\Models;

use Illuminate\Database\Eloquent\Model;

class EventPreference extends Model
{
    protected $fillable = ['event_id', 'key', 'value'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
