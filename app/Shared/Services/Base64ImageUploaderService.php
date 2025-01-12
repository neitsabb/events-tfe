<?php

namespace App\Shared\Services;

use Illuminate\Support\Facades\Storage;

class Base64ImageUploaderService
{
	/**
	 * Upload une image encodée en base64 vers le stockage Laravel.
	 *
	 * @param string $base64Data Données de l'image en base64.
	 * @param string $path Chemin de stockage.
	 * @return array|string Le nom de fichier ou un tableau d'erreurs.
	 */
	public static function uploadFromBase64(string $base64Data, string $path, array $allowedExtensions): array|string
	{
		if (!preg_match('/^data:image\/(jpeg|png|gif|bmp|webp);base64,/', $base64Data)) {
			return ['errors' => ['image' => 'Format Base64 non valide ou non supporté.']];
		}

		// Extraire et décoder les données
		$base64Data = preg_replace('/^data:image\/\w+;base64,/', '', $base64Data);
		$decodedData = base64_decode($base64Data);

		if ($decodedData === false) {
			return ['errors' => ['image' => 'Échec du décodage des données Base64.']];
		}

		// Déterminer l'extension en fonction du type MIME
		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		$mimeType = finfo_buffer($finfo, $decodedData);
		finfo_close($finfo);

		$extension = $allowedExtensions[$mimeType] ?? null;

		if ($extension === null) {
			return ['errors' => ['image' => 'Type d\'image non pris en charge.']];
		}

		// Générer un nom de fichier unique
		$uniqueFilename = uniqid() . '.' . $extension;
		$destination = $path . '/' . $uniqueFilename;

		if (Storage::disk('public')->put($destination, $decodedData)) {
			return $uniqueFilename;
		} else {
			return ['errors' => ['image' => 'Échec de l\'enregistrement de l\'image.']];
		}
	}
}
