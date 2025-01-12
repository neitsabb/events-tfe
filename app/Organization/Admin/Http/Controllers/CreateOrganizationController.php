<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Http\Requests\CreateOrganizationRequest;
use App\Shared\Http\Controller;
use App\Shared\Services\Base64ImageUploaderService;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class CreateOrganizationController extends Controller
{
	public function __invoke(CreateOrganizationRequest $request)
	{

		$validated = $request->validated();

		$image = Base64ImageUploaderService::uploadFromBase64(
			$validated['logo'],
			'organizations',
			[
				'image/jpeg' => 'jpg',
				'image/png'  => 'png',
				'image/gif'  => 'gif',
			]
		);

		if (isset($image['errors'])) {
			return Redirect::back()->withErrors($image['errors']);
		}

		$validated['logo'] = $image;

		$organization = $request->user()->organizations()->create($validated);

		$organization->users()->updateExistingPivot($request->user()->id, ['role' => 'owner']);

		Session::put('selected_organization', $organization);

		return Redirect::back()->with('success', 'L\'organisation a bien été créée.');
	}
}
