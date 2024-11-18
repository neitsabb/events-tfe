<?php

namespace App\Tags\Shared\Models;

use App\Events\Shared\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'events_tags');
    }
}
