<?php

namespace App\Auth\Http\Controllers;

use App\Shared\Http\Controller;
use App\User\Mail\VerifyEmail;
use App\User\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SendEmailVerificationController extends Controller
{
	public function __invoke(Request $request)
	{
		$validated = $request->validate([
			'email' => 'required|email'
		], [
			'email.required' => 'L\'adresse email est obligatoire.',
			'email.email' => 'L\'adresse email doit être une adresse valide.',
		]);

		$user = User::where('email', $validated['email'])->first();

		if (!$user) {
			$user = User::create([
				'email' => $validated['email'],
				'verification_token' => User::generateVerificationToken()
			]);
		}

		Mail::to($user->email)->send(new VerifyEmail($user->verification_token));

		return Inertia::render('Auth/Register/Join/View', [
			'email' => $user->email,
		])->with('success', 'Un email de vérification a été envoyé.');
	}
}
