<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Http\Requests\InviteUsersToOrganizationRequest;
use App\Organization\Admin\Jobs\SendInvitationMail;

use App\User\Models\User;


use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;


class InviteUsersToOrganizationController
{
	public function __invoke(InviteUsersToOrganizationRequest $request)
	{
		foreach ($request->validated()['users'] as $email) {
			if ($user = User::where('email', $email)->first()) {
				Session::get('selected_organization')
					->users()
					->syncWithoutDetaching($user->id);
			} else {
				$user = User::create([
					'email' => $email,
					'verification_token' => bin2hex(random_bytes(32)),
				]);

				Session::get('selected_organization')
					->users()
					->attach($user);


				SendInvitationMail::dispatch(
					$user->email,
					$user->verification_token,
					Session::get('selected_organization')->name
				);
			}
		}

		return Redirect::back()->with('success', 'Les utilisateurs ont été invités.');
	}
}
