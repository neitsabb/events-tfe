<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisplayEventsListController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $organisation = $request->session()->get('selected_organization')
            ? $request->session()->get('selected_organization')
            : $request->user()->organizations()->first();

        return Inertia::render('Events/Admin/Index/View', [
            'events' => EventResource::collection(
                Event::where('organization_id', $organisation->id)
                    ->orderBy('start_date', 'desc')
                    ->get()
            ),
        ]);
    }
}
