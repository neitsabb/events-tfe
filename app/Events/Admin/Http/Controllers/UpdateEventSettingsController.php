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
     * Update the settings of an event depending on the fields submitted
     * @param int $id
     * @param \Illuminate\Http\Request $request
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
                    if (is_string($value) && preg_match('#^/storage/events/#', $value)) {
                        return;
                    }

                    if (!is_string($value) && !$value->isValid()) {
                        $fail('Le fichier d\'image n\'est pas valide.');
                    }
                },

                'max:2048',
            ],
        ]);

        if (
            $request->hasFile('image') &&
            $request->image instanceof \Illuminate\Http\UploadedFile &&
            !is_string($request->image)
        ) {
            $imagePath = Storage::disk('public')->put('events', $request->file('image'));
            $event->update(['image' => $imagePath]);
        }

        unset($validated['image']);

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

        if ($request->has('preferences')) {
            $submittedPreferences = collect($validated['preferences'])
                ->filter(function ($preference) {
                    if ($preference['key'] === 'legal_age' && is_null($preference['value'])) {
                        return false;
                    }

                    if ($preference['key'] === 'required_fields' && is_array($preference['value']) && empty($preference['value'])) {
                        return false;
                    }

                    return true;
                });

            $existingPreferences = $event->preferences;

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

            $submittedKeys = $submittedPreferences->pluck('key')->toArray();
            $existingKeys = $existingPreferences->pluck('key')->toArray();

            $keysToDelete = array_diff($existingKeys, $submittedKeys);

            if (!empty($keysToDelete)) {
                EventPreference::where('event_id', $event->id)
                    ->whereIn('key', $keysToDelete)
                    ->delete();
            }
        }

        if ($request->has('tags')) {
            $existingTags = $event->tags->pluck('name')->toArray();
            $submittedTags = $request->input('tags');

            $newTags = collect($submittedTags)
                ->unique()
                ->reject(function ($tag) use ($existingTags) {
                    return in_array($tag, $existingTags);
                })
                ->map(function ($tag) {
                    return ['name' => $tag];
                })
                ->toArray();

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


    /**
     * Check if a field is present in the request
     * @param array $fields
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    private function hasFieldInRequest(array $fields, Request $request): bool
    {
        return collect($fields)->filter(function ($field) use ($request) {
            return $request->has($field);
        })->count() > 0;
    }
}
