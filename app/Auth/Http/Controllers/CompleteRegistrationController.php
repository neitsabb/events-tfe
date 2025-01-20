<?php

namespace App\Auth\Http\Controllers;

use Inertia\Inertia;
use App\User\Models\User;
use Illuminate\Http\Request;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Auth\Http\Requests\CompleteRegistrationRequest;

class CompleteRegistrationController extends Controller
{
	public function __invoke(CompleteRegistrationRequest $request)
	{

		if ($request->isMethod('get')) {

			if (!$request->has('token')) {
				return Redirect::route('register.join');
			}

			$user = User::where('verification_token', $request->get('token'))->first();

			if (!$user) {
				return Redirect::route('register.join');
			}

			return Inertia::render('Auth/Register/Complete/View', [
				'email' => $user->email,
			]);
		}

		$validated = $request->validated();
		$user = User::where('email', $validated['email'])->first();

		if (!$user) {
			return Redirect::route('register.signup');
		}

		$validated['image'] = $request->hasFile('image')
			? Storage::disk('public')->put('users', $request->file('image'))
			: 'users/default.png';

		$user->update(array_merge(
			$validated,
			[
				'password' => bcrypt($validated['password']),
				'name' => $validated['firstname'] . ' ' . $validated['lastname'],
				'verification_token' => null,
				'email_verified_at' => now(),
			]
		));

		Auth::login($user);

		return redirect()->intended(route('dashboard', absolute: false));
	}
}
