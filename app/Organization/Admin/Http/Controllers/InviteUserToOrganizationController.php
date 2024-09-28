<?php

namespace App\Organization\Admin\Http\Controllers;

use App\User\Models\User;
use Illuminate\Http\Request;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use App\Organization\Admin\Http\Requests\CreateOrganizationRequest;
use App\Organization\Admin\Mail\InvitationMail;
use Illuminate\Support\Facades\Mail;

class InviteUserToOrganizationController extends Controller
{
	public function __invoke(Request $request)
	{
		$request->validate([
			'email' => 'required|email',
		]);


		if ($user = User::where('email', $request->email)->first()) {
			Session::get('selected_organization')
				->users()
				->syncWithoutDetaching($user->id);
		} else {
			$user = User::create([
				'email' => $request->email,
			]);

			Session::get('selected_organization')
				->users()
				->attach($user);

			Mail::to($user->email)
				->send(
					new InvitationMail($user)
				);
		}

		return response()->json(['message' => 'User added to organization'], 201);
	}
}
