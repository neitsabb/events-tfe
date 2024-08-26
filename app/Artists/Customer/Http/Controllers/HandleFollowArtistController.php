<?php

namespace App\Artists\Customer\Http\Controllers;

use App\Artists\Shared\Models\Artist;
use App\Shared\Http\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class HandleFollowArtistController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request, Artist $artist): RedirectResponse
    {
        $user = $request->user();

        if ($user->followingArtists()->where('artist_id', $artist->id)->exists()) {
            $user->followingArtists()->detach($artist->id);
        } else {
            $user->followingArtists()->attach($artist->id);
        }

        return Redirect::back();
    }
}
