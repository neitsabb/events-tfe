<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreviewEventController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Event $event)
    {
        $event->load('tickets', 'organization', 'tags');

        return Inertia::render('Events/Customer/Show/View', [
            'isPreview' => true,
            'event' => EventResource::make($event),
        ]);
    }
}
