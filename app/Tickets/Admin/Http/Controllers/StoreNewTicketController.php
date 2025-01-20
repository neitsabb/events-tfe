<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;

use App\Tickets\Admin\Http\Requests\StoreOrUpdateTicketRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class StoreNewTicketController
{
    public function __invoke(Event $event, StoreOrUpdateTicketRequest $request): RedirectResponse
    {
        $event
            ->tickets()
            ->create($request->validated());

        return Redirect::route('events.show', [
            'event' => $event,
            'panel' => 'tickets',
        ])->with('success', 'Le billet a été créé avec succès.');
    }
}
