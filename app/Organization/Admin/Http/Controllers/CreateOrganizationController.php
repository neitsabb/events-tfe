<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Http\Requests\CreateOrganizationRequest;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class CreateOrganizationController extends Controller
{
	public function __invoke(CreateOrganizationRequest $request)
	{
		$organization = $request->user()->organizations()->create($request->validated());

		$organization->users()->updateExistingPivot($request->user()->id, ['role' => 'owner']);

		Session::put('selected_organization', $organization);

		return Redirect::back()->with('success', 'L\'organisation a bien été créée.');
	}
}
