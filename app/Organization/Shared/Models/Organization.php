<?php

namespace App\Organization\Shared\Models;

use App\Events\Shared\Models\Event;
use App\User\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'type', 'stripe_account_id', 'stripe_status'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
