<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Shared\Http\Controller;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class DeleteTicketController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(Event $event, Ticket $ticket): RedirectResponse
    {

        $ticket->delete();

        return Redirect::route('events.show', [
            'event' => $event,
            'panel' => 'tickets',
        ]);
    }
}
