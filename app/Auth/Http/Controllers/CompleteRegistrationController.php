<?php

namespace App\Auth\Http\Controllers;

use App\Shared\Http\Controller;
use App\User\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
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
			'image' => 'nullable|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp',
		]);

		$user = User::where('email', $validatedData['email'])->first();

		if (!$user) {
			return Redirect::route('customer.auth.signup');
		}

		if ($request->has('image')) {
			$validatedData['image'] = Storage::disk('public')->put('users', $request->file('image'));
		} else {
			$validatedData['image'] = 'users/default.png';
		}

		$user->update([
			'password' => bcrypt($validatedData['password']),
			'verification_token' => null,
			'email_verified_at' => now(),
			'firstname' => $validatedData['firstname'],
			'lastname' => $validatedData['lastname'],
			'name' => $validatedData['firstname'] . ' ' . $validatedData['lastname'],
			'image' => $validatedData['image'],
		]);

		Auth::login($user);

		return redirect()->intended(route('dashboard', absolute: false));
	}
}
