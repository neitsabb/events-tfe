<?php

namespace App\User\Customer\Http;

use App\User\Customer\Request\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class UpdateProfileController
{
	public function __invoke(UpdateProfileRequest $request)
	{
		$validated = $request->validated();

		if ($request->hasFile('image')) {
			$imagePath = $request->file('image')->store('users', 'public');
			$request->user()->update(['image' => $imagePath]);
		}

		unset($validated['image']);

		$request->user()->update($validated);

		return Redirect::back()->with('success', 'Les informations ont été mises à jour.');
	}
}
