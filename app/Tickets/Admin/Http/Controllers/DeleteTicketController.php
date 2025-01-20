<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;

use App\Tickets\Shared\Models\Ticket;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class DeleteTicketController
{
    /**
     * Delete a ticket
     * @param \App\Events\Shared\Models\Event $event
     * @param \App\Tickets\Shared\Models\Ticket $ticket
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Event $event, Ticket $ticket): RedirectResponse
    {
        $ticket->delete();

        return Redirect::route('events.show', [
            'event' => $event,
            'panel' => 'tickets',
        ])->with('success', 'Le billet a bien été supprimé.');
    }
}
