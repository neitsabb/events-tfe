<?php

namespace App\Events\Shared\Models;

use App\Organization\Shared\Models\Organization;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'latitude',
        'longitude',
        'description',
        'start_date',
        'end_date',
        'location',
        'price',
        'currency',
        'status',
        'organization_id'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function preferences()
    {
        return $this->hasMany(EventPreference::class);
    }
}
