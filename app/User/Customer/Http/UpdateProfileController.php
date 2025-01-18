<?php

namespace App\User\Customer\Http;

use App\User\Customer\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class UpdateProfileController
{

	public function __invoke(Request $request)
	{

		$validated = $request->validate([
			'firstname' => 'required|string',
			'lastname' => 'required|string',
			'birthday' => 'required|date',
			'email' => 'required|email',
			'image' => [
				'nullable',
				function ($attribute, $value, $fail) use ($request) {
					// Vérifier si c'est un chemin existant
					if (is_string($value) && preg_match('#^/storage/users/#', $value)) {
						return;
					}

					// Si ce n'est pas un chemin, vérifier si c'est un fichier valide
					if ($request->hasFile('image')) {
						$file = $request->file('image');
						if (!$file->isValid()) {
							$fail('L\'image n\'est pas valide.');
						} elseif (!in_array($file->getMimeType(), ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/avif'])) {
							$fail('Le fichier doit être une image valide.');
						} elseif ($file->getSize() > 2048 * 1024) {
							$fail('L\'image ne doit pas dépasser 2 Mo.');
						}
					} else {
						// Si ce n'est ni un chemin valide ni un fichier envoyé, échouer
						$fail('L\'image doit être un fichier valide ou un chemin existant.');
					}
				},
			],
		], [
			'birthday.required' => 'La date de naissance est obligatoire.',
			'email.required' => 'L\'adresse email est obligatoire.',
			'email.email' => 'L\'adresse email doit être valide.',
			'firstname.required' => 'Le prénom est obligatoire.',
			'lastname.required' => 'Le nom est obligatoire.',
		]);

		if ($request->hasFile('image') && $request->image instanceof \Illuminate\Http\UploadedFile) {
			$validated['image'] = Storage::disk('public')->put('users', $validated['image']);
			$request->user()->update(['image' => $validated['image']]);
		}

		unset($validated['image']);

		$request->user()->update($validated);

		return Redirect::back()->with('success', 'Les informations ont été mises à jour.');
	}
}
