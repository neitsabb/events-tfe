<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Redirect;

class PublishEventController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Event $event)
    {
        if (!$event->organization->isStripeConnected()) {
            return Redirect::back()->withErrors([
                'error' => 'Vous n\'avez pas compléter votre compte Stripe.'
            ]);
        }
        if ($event->tickets->isEmpty()) {
            return Redirect::back()->withErrors([
                'error' => 'Vous ne pouvez pas publier un événement sans tickets.'
            ]);
        }

        $event->update([
            'status' => 'published'
        ]);

        return Redirect::route('admin.events.show', $event);
    }
}
