<?php

namespace App\Events\Shared\Models;

use App\Organization\Shared\Models\Organization;
use App\Tags\Shared\Models\Tag;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;


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
        'street',
        'city',
        'country',
        'zip_code',
        'price',
        'currency',
        'status',
        'organization_id'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    /**
     * Generate a unique slug for the given name.
     */
    public static function generateUniqueSlug(string $name): string
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;

        // Loop until a unique slug is found
        while (self::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }

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

    public function tags()
    {
        return $this->hasMany(EventTag::class);
    }
}
