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
        return Inertia::render('Events/Admin/Index/View', [
            'events' => EventResource::collection(Event::all()),
        ]);
    }
}
