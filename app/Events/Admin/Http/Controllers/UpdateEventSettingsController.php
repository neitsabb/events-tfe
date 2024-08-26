<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
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
            'legal_age' => 'sometimes|number',
            'required_fields' => 'sometimes|array',
        ]);

        // Si on a au moins un des champs dans la requête
        if ($this->hasFieldInRequest(['name', 'description', 'location', 'start_date', 'end_date'], $request)) {
            $event->update($validated);
        }

        if ($this->hasFieldInRequest(['legal_age'], $request)) {
            // Update legal age
        }

        if ($this->hasFieldInRequest(['required_fields'], $request)) {
            // Update required fields
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
