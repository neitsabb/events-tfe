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
            'image' => 'sometimes|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/webp,image/avif|max:2048',
        ]);


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
            foreach ($validated['preferences'] as $preference) {
                EventPreference::updateOrCreate([
                    'event_id' => $event->id,
                    'key' => $preference['key'],
                ], [
                    'value' => $preference['value'],
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $validated['image'] = Storage::disk('public')->put('events', $request->file('image'));
            $event->update(['image' => $validated['image']]);
        }

        if ($request->has('tags')) {
            $event->tags()->createMany(
                collect($request->input('tags'))->map(function ($tag) {
                    return ['name' => $tag];
                })->toArray()
            );
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
