<?php

namespace App\Organization\Admin\Http\Controllers;

use App\User\Models\User;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class RemoveUserFromOrganizationController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        Gate::authorize('settings', Session::get('selected_organization'));

        $user = User::where('email', $request->email)->first();
        $organization = Session::get('selected_organization');

        if ($user->id === auth()->user()->id) {
            return Redirect::back()->withErrors('Vous ne pouvez pas vous retirer vous même de l\'organisation.');
        }

        if (!$organization->users()
            ->where('user_id', $user->id)
            ->first()) {
            return Redirect::back()->withErrors('Cet utilisateur n\'est pas dans votre organisation.');
        }

        if ($organization->users()->where('user_id', $user->id)->first()->role === 'owner') {
            return Redirect::back()->withErrors('Vous ne pouvez pas retirer le propriétaire de l\'organisation.');
        }

        $organization->users()->detach($user->id);

        return Redirect::back()->with('success', 'L\'utilisateur a bien été retiré de l\'organisation.');
    }
}
