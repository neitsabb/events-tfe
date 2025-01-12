<?php

namespace App\Auth\Http\Controllers;

use App\Shared\Http\Controller;
use App\User\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CompleteRegistrationController extends Controller
{
	public function __invoke(Request $request)
	{
		if ($request->isMethod('get')) {
			if (!$request->has('token')) {
				return Redirect::route('customer.auth.join');
			}

			$user = User::where('verification_token', $request->get('token'))->first();

			if (!$user) {
				return Redirect::route('customer.auth.join');
			}

			return Inertia::render('Auth/Register/Complete/View', [
				'email' => $user->email,
			]);
		}

		// Validation des données
		$validatedData = $request->validate([
			'email' => 'required|email',
			'password' => 'required|min:8|confirmed',
			'firstname' => 'required|string',
			'lastname' => 'required|string',
		]);

		$user = User::where('email', $validatedData['email'])->first();

		if (!$user) {
			return Redirect::route('customer.auth.signup');
		}

		$user->update([
			'password' => bcrypt($validatedData['password']),
			'verification_token' => null,
			'email_verified_at' => now(),
			'firstname' => $validatedData['firstname'],
			'lastname' => $validatedData['lastname'],
		]);

		Auth::login($user);

		return redirect()->intended(route('dashboard', absolute: false));
	}
}
