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
use App\Tickets\Admin\Http\Requests\StoreOrUpdateTicketRequest;
use Illuminate\Support\Facades\Gate;

class UpdateTicketController extends Controller
{
	public function __invoke(Event $event, StoreOrUpdateTicketRequest $request): RedirectResponse
	{
		Ticket::findOrFail($request->ticket_id)
			->update($request->validated());

		return Redirect::route('events.show', [
			'event' => $event,
			'panel' => 'tickets',
		])->with('success', 'Le ticket a bien été mis à jour.');
	}
}
