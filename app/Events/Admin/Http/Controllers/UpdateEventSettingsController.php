<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Models\EventPreference;
use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

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
            'location' => 'sometimes|string',
            'coords' => 'sometimes|array',
            // 'legal_age' => 'sometimes|number',
            // 'required_fields' => 'sometimes|array',
            'preferences' => 'sometimes|array',
            'preferences.*.key' => 'required_with:preferences|string',
            'preferences.*.value' => 'required_with:preferences'
        ]);

        // Si on a au moins un des champs dans la requête
        if ($this->hasFieldInRequest(['name', 'description', 'location', 'start_date', 'end_date'], $request)) {
            $event->update($validated);
        }

        if ($request->has('coords')) {
            $event->update([
                'latitude' => $request->input('coords')['lat'],
                'longitude' => $request->input('coords')['lng'],
            ]);
        }

        // Mise à jour des préférences de l'événement
        if ($request->has('preferences')) {
            foreach ($request->input('preferences') as $preference) {
                EventPreference::updateOrCreate([
                    'event_id' => $event->id,
                    'key' => $preference['key'],
                ], [
                    'value' => $preference['value'],
                ]);
            }
        }

        return Redirect::back();
    }

    private function hasFieldInRequest(array $fields, Request $request): bool
    {
        return collect($fields)->filter(function ($field) use ($request) {
            return $request->has($field);
        })->count() > 0;
    }
}
