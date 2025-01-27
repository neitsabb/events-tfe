<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Shared\Http\Controller;

use App\Events\Shared\Models\Event;

use App\Tickets\Shared\Models\Ticket;
use App\Tickets\Admin\Http\Requests\StoreOrUpdateTicketRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class UpdateTicketController extends Controller
{
	public function __invoke(Event $event, StoreOrUpdateTicketRequest $request): RedirectResponse
	{
		Ticket::findOrFail($request->ticket_id)
			->update($request->validated());

		return Redirect::route('events.show', [
			'event' => $event,
			'panel' => 'tickets',
		])->with('success', 'Le billet a bien été mis à jour.');
	}
}
