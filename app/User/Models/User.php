<?php

namespace App\User\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Artists\Shared\Models\Artist;
use App\Events\Shared\Models\Event;
use App\Organization\Shared\Models\Organization;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'stripe_id',
        'verification_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function organizations(): BelongsToMany
    {
        return $this->belongsToMany(Organization::class, 'organizations_users')->withPivot('role');
    }

    public function isOrganizer(): bool
    {
        return $this->organizations()->exists();
    }

    public function followingArtists(): BelongsToMany
    {
        return $this->belongsToMany(Artist::class, 'artists_followers', 'user_id', 'artist_id');
    }
}
