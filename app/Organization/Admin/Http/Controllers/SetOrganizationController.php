<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Shared\Models\Organization;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class SetOrganizationController
{
	public function __invoke(Request $request)
	{
		$organisationId = $request->input('organizationId');

		if (auth()->user()->organizations()->where('organizations.id', $organisationId)->exists()) {
			Session::put('selected_organization', Organization::find($organisationId));
			return Redirect::route('dashboard');
		}

		return false;
	}
}
