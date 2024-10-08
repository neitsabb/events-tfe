<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Shared\Http\Controller;
use App\Events\Shared\Models\Event;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Tickets\Admin\Dtos\UpdateTicketDto;
use App\Tickets\Admin\Actions\UpdateTicketAction;
use App\Tickets\Admin\Http\Requests\StoreNewTicketRequest;

class UpdateTicketController extends Controller
{
	public function __invoke(Event $event, StoreNewTicketRequest $request): RedirectResponse
	{
		Ticket::findOrFail($request->get('ticket_id'))
			->update($request->validated());

		return Redirect::route('events.show', [
			'event' => $event,
			'panel' => 'tickets',
		]);
	}
}
