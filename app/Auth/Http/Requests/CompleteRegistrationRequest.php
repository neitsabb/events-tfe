<?php

namespace App\Auth\Http\Requests;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CompleteRegistrationRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
	 */
	public function rules(): array
	{
		return [
			'email' => 'required|email',
			'password' => 'required|min:8|confirmed',
			'firstname' => 'required|string',
			'lastname' => 'required|string',
			'image' => 'nullable|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp'
		];
	}

	public function messages()
	{
		return [
			'email.required' => 'L\'adresse email est obligatoire.',
			'email.email' => 'L\'adresse email doit être une adresse valide.',
			'password.required' => 'Le mot de passe est obligatoire.',
			'password.min' => 'Le mot de passe doit contenir au moins :min caractères.',
			'password.confirmed' => 'Les mots de passe ne correspondent pas.',
			'firstname.required' => 'Le prénom est obligatoire.',
			'lastname.required' => 'Le nom est obligatoire.',
			'image.mimetypes' => 'Le fichier doit être une image.'
		];
	}
}
