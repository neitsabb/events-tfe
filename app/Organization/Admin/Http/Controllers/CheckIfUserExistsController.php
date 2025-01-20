<?php

namespace App\Organization\Admin\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CheckIfUserExistsController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = \App\User\Models\User::where('email', $request->email)->first();

        return Redirect::route('organizations.settings', [
            'panel' => 'team',
        ])->with('user', $user ?: $request->email);
    }
}
