<?php

namespace App\Auth\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompleteRegistrationRequest extends FormRequest
{
	/**
	 * Détermine si l'utilisateur est autorisé à effectuer cette requête.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Définir les règles de validation.
	 */
	public function rules(): array
	{
		return $this->isMethod('post') ? [
			'email' => 'required|email',
			'password' => 'required|min:8|confirmed',
			'firstname' => 'required|string',
			'lastname' => 'required|string',
			'image' => 'nullable|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp',
			'birthday' => 'required|date',
		] : [];
	}

	/**
	 * Messages personnalisés pour les erreurs de validation.
	 */
	public function messages(): array
	{
		return [
			'email.required' => 'L\'adresse email est obligatoire.',
			'email.email' => 'L\'adresse email doit être une adresse valide.',
			'password.required' => 'Le mot de passe est obligatoire.',
			'password.min' => 'Le mot de passe doit contenir au moins :min caractères.',
			'password.confirmed' => 'Les mots de passe ne correspondent pas.',
			'firstname.required' => 'Le prénom est obligatoire.',
			'lastname.required' => 'Le nom est obligatoire.',
			'image.mimetypes' => 'Le fichier doit être une image.',
			'birthday.date' => 'La date de naissance doit être une date.',
			'birthday.required' => 'La date de naissance est obligatoire.',
		];
	}
}
