<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Models\EventPreference;
use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class UpdateEventSettingsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke($id, Request $request)
    {
        $event = Event::findOrFail($id);


        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
            'location' => 'sometimes',
            'coords' => 'sometimes|array',
            // 'legal_age' => 'sometimes|number',
            // 'required_fields' => 'sometimes|array',
            'preferences' => 'sometimes|array',
            'preferences.*.key' => 'required_with:preferences|string',
            'preferences.*.value' => 'nullable',
            'image' => [
                'sometimes',
                'nullable',
                function ($attribute, $value, $fail) {
                    // Vérifier si c'est une URL
                    if (is_string($value) && preg_match('#^/storage/events/#', $value)) {
                        // Si c'est une URL, on ignore la validation
                        return;
                    }

                    // Sinon, valider comme un fichier
                    if (!is_string($value) && !$value->isValid()) {
                        $fail('Le fichier d\'image n\'est pas valide.');
                    }
                },

                'max:2048',
            ],
        ]);


        // Si une image est soumise, on la traite séparément
        if ($request->hasFile('image') && $request->image instanceof \Illuminate\Http\UploadedFile && !is_string($request->image)) {
            $imagePath = Storage::disk('public')->put('events', $request->file('image'));
            $event->update(['image' => $imagePath]);
        }

        // Retirer la clé 'image' du tableau validé pour éviter une mise à jour non voulue
        unset($validated['image']);

        // Si on a au moins un des champs dans la requête
        if ($this->hasFieldInRequest(['name', 'description', 'start_date', 'end_date'], $request)) {
            $event->update($validated);
        }

        if ($request->has('location')) {
            $event->update(
                collect($validated['location'])
                    ->only(['street', 'city', 'zip_code', 'country'])
                    ->toArray()
            );
        }

        if ($request->has('coords')) {
            $event->update([
                'latitude' => $validated['coords']['lat'],
                'longitude' => $validated['coords']['lng'],
            ]);
        }

        // Mise à jour des préférences de l'événement
        if ($request->has('preferences')) {
            $submittedPreferences = collect($validated['preferences']) // Préférences soumises
                ->filter(function ($preference) {
                    // Filtrer les préférences avec une value null ou un tableau vide
                    if ($preference['key'] === 'legal_age' && is_null($preference['value'])) {
                        return false;
                    }

                    if ($preference['key'] === 'required_fields' && is_array($preference['value']) && empty($preference['value'])) {
                        return false;
                    }

                    return true;
                });

            $existingPreferences = $event->preferences; // Préférences existantes dans l'événement

            // Mettre à jour ou créer les préférences soumises
            foreach ($submittedPreferences as $preference) {
                if (!isset($preference['key']) || !isset($preference['value'])) {
                    continue;
                }

                EventPreference::updateOrCreate(
                    [
                        'event_id' => $event->id,
                        'key' => $preference['key'],
                    ],
                    [
                        'value' => $preference['value'],
                    ]
                );
            }

            // Supprimer les préférences qui ne sont pas dans la requête
            $submittedKeys = $submittedPreferences->pluck('key')->toArray(); // Récupérer les clés des préférences soumises
            $existingKeys = $existingPreferences->pluck('key')->toArray(); // Récupérer les clés des préférences existantes

            $keysToDelete = array_diff($existingKeys, $submittedKeys); // Préférences existantes mais absentes dans la requête

            if (!empty($keysToDelete)) {
                EventPreference::where('event_id', $event->id)
                    ->whereIn('key', $keysToDelete)
                    ->delete();
            }
        }

        if ($request->has('tags')) {
            $existingTags = $event->tags->pluck('name')->toArray();
            $submittedTags = $request->input('tags');

            // Tags à ajouter
            $newTags = collect($submittedTags)
                ->unique()
                ->reject(function ($tag) use ($existingTags) {
                    return in_array($tag, $existingTags);
                })
                ->map(function ($tag) {
                    return ['name' => $tag];
                })
                ->toArray();

            // Tags à supprimer
            $tagsToDelete = collect($existingTags)
                ->reject(function ($tag) use ($submittedTags) {
                    return in_array($tag, $submittedTags);
                })
                ->toArray();

            if (!empty($newTags)) {
                $event->tags()->createMany($newTags);
            }

            if (!empty($tagsToDelete)) {
                $event->tags()->whereIn('name', $tagsToDelete)->delete();
            }
        }

        return Redirect::back()->with('success', 'Les paramètres de l\'événement ont bien été mis à jour.');
    }

    private function hasFieldInRequest(array $fields, Request $request): bool
    {
        return collect($fields)->filter(function ($field) use ($request) {
            return $request->has($field);
        })->count() > 0;
    }
}
