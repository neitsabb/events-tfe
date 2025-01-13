<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Enums\EventStatusEnum;
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
        if ($event->status === EventStatusEnum::PUBLISHED->value) {
            $event->update(['status' => EventStatusEnum::DRAFT]);
            return Redirect::route('events.show', $event)->with('success', 'L\'événement a été dépublié.');
        }

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
            'status' => EventStatusEnum::PUBLISHED->value
        ]);
        return Redirect::route('events.show', $event)->with('success', 'L\'événement a été publié.');
    }
}
