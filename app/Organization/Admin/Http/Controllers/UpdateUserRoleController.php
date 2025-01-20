<?php

namespace App\Organization\Admin\Http\Controllers;

use App\User\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class UpdateUserRoleController
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'role' => 'required|in:admin,member,owner',
        ]);

        if (User::find($request->userId)->organizations()->where('organization_id', Session::get('selected_organization')->id)->first()->pivot->role === 'owner') {
            return Redirect::back()->withErrors(['role' => 'Vous ne pouvez pas modifier le rôle du propriétaire.']);
        }

        Session::get('selected_organization')->users()->updateExistingPivot($request->userId, [
            'role' => $request->role,
        ]);

        return Redirect::back()->with('success', 'Le rôle de l\'utilisateur a été modifié.');
    }
}
