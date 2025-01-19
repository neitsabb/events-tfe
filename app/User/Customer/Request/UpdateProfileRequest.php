<?php

namespace App\User\Customer\Request;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules(): array
	{
		return [
			'firstname' => 'required|string',
			'lastname' => 'required|string',
			'birthday' => 'required|date',
			'email' => 'required|email',
			'image' => [
				'nullable', // Champ optionnel
				function ($attribute, $value, $fail) {
					// Vérifiez si une nouvelle image a été envoyée
					if ($this->hasFile('image')) {
						$file = $this->file('image');

						// Vérifications sur le fichier
						if (!$file->isValid()) {
							$fail('L\'image n\'est pas valide.');
						} elseif (!in_array($file->getMimeType(), ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/avif'])) {
							$fail('Le fichier doit être une image valide.');
						} elseif ($file->getSize() > 2048 * 1024) {
							$fail('L\'image ne doit pas dépasser 2 Mo.');
						}
					}
				}
			],
		];
	}

	/**
	 * Summary of messages
	 * @return array
	 */
	public function messages(): array
	{
		return [
			'birthday.required' => 'La date de naissance est obligatoire.',
			'email.required' => 'L\'adresse email est obligatoire.',
			'email.email' => 'L\'adresse email doit être valide.',
			'firstname.required' => 'Le prénom est obligatoire.',
			'lastname.required' => 'Le nom est obligatoire.',
		];
	}
}
