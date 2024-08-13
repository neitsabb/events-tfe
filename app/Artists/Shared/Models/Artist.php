<?php

namespace App\Artists\Shared\Models;

use App\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    public function links(): HasMany
    {
        return $this->hasMany(Link::class);
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'artists_followers');
    }
}
