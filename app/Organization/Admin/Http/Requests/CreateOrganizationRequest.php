<?php

namespace App\Organization\Admin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrganizationRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	public function prepareForValidation() {}

	public static function rules(): array
	{
		return [
			"name" => "required|string",
			"description" => "required|string|max:255",
			"type" => "required|string",
			"genres" => "nullable",
			"logo" => "nullable|image",
			"website" => "nullable|url",
		];
	}

	public function messages(): array
	{
		return [
			"name.required" => "Le nom de l'organisation est requis",
			"name.string" => "Le nom de l'organisation doit être une chaîne de caractères",

			"description.required" => "La description de l'organisation est requise",
			"description.string" => "La description de l'organisation doit être une chaîne de caractères",
			"description.max" => "La description de l'organisation ne doit pas dépasser 255 caractères",

			"type.required" => "Le type de l'organisation est requis",
			"type.string" => "Le type de l'organisation doit être une chaîne de caractères",

			"genres.array" => "Les genres de l'organisation doivent être un tableau",

			"logo.image" => "Le logo de l'organisation doit être une image",

			"website.url" => "Le site web de l'organisation doit être une URL",

		];
	}
}
