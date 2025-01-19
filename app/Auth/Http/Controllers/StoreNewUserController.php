<?php

namespace App\Auth\Http\Controllers;

use App\Auth\Http\Requests\CompleteRegistrationRequest;
use App\Shared\Http\Controller;
use App\User\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StoreNewUserController extends Controller
{
	public function __invoke(CompleteRegistrationRequest $request)
	{
		$user = User::create($request->validated());

		Auth::login($user);
		return Redirect::back();
	}
}
