<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;

use Inertia\Inertia;

class DisplayEventsListController
{
    /**
     * Display the events list of the organization logged
     * @return \Inertia\Response
     */
    public function __invoke()
    {
        return Inertia::render('Events/Admin/Index/View', [
            'events' => EventResource::collection(
                Event::withTrashed()
                    ->with('tickets.transactions')
                    ->where('organization_id', session('selected_organization')->id)
                    ->orderBy('start_date', 'desc')
                    ->get()
            ),
        ]);
    }
}
