<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Http\Requests\CreateOrganizationRequest;
use App\Shared\Http\Controller;
use App\Shared\Services\Base64ImageUploaderService;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class CreateOrganizationController extends Controller
{
	public function __invoke(CreateOrganizationRequest $request)
	{

		$validated = $request->validated();

		if ($request->hasFile('logo')) {
			$validated['logo'] = Storage::disk('public')->put('organizations', $validated['logo']);
		} else {
			$validated['logo'] = 'organizations/default.png';
		}

		$organization = $request->user()->organizations()->create($validated);

		$organization->users()->updateExistingPivot($request->user()->id, ['role' => 'owner']);

		Session::put('selected_organization', $organization);

		return Redirect::back()->with('success', 'L\'organisation a bien été créée.');
	}
}
