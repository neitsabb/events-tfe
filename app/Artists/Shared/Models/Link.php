<?php

namespace App\Artists\Shared\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = ['link', 'type'];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
