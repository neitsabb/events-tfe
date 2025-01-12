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
			'email' => 'required|email|unique:users,email'
		]);


		$user = User::create([
			'email' => $validated['email'],
			'verification_token' => bin2hex(random_bytes(32))
		]);


		Mail::to($user->email)->send(new VerifyEmail($user->verification_token));

		return Inertia::render('Auth/Register/Join/View', [
			'email' => $user->email,
		])->with('success', 'Email verification link has been sent to your email.');
	}
}
