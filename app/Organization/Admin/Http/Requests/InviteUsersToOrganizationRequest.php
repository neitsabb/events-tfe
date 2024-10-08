<?php

namespace App\Organization\Admin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class InviteUsersToOrganizationRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return Gate::allows('invite', $this->session()->get('selected_organization'));
	}

	public function prepareForValidation() {}

	public static function rules(): array
	{
		return [
			'users' => 'required',
			'users.*' => 'required|email',
		];
	}

	public function messages(): array
	{
		return [
			"users.required" => "Les adresses e-mails des utilisateurs sont requises.",
			"users.*.email" => 'L\'adresse email doit être valide.',
		];
	}
}
