<?php

namespace App\Organization\Admin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrganizationRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}


	public function rules(): array
	{
		return [
			'name' => 'required|string',
			'description' => 'nullable|string|max:255',
			'type' => 'required|string',
			'logo' => [
				'nullable',
				function ($attribute, $value, $fail) {
					if ($this->hasFile('logo')) {
						$file = $this->file('logo');
						if (!$file->isValid()) {
							$fail('Le fichier du logo n\'est pas valide.');
						} elseif (!in_array($file->getMimeType(), ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/avif'])) {
							$fail('Le fichier doit être une image valide.');
						} elseif ($file->getSize() > 2048 * 1024) {
							$fail('Le fichier du logo ne doit pas dépasser 2 Mo.');
						}
					}
				},
			],
			'website' => 'nullable|string',
		];
	}

	public function messages(): array
	{
		return [
			"name.required" => "Le nom de l'organisation est obligatoire.",
			"description.max" => "La description ne doit pas dépasser :max caractères.",
			"type.required" => "Le type de l'organisation est obligatoire.",
			"logo.mimetypes" => "Le fichier doit être une image.",
			"website.url" => "Le site web doit être une URL valide.",
		];
	}
}
