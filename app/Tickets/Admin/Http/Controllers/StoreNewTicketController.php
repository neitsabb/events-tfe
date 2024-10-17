<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Shared\Http\Controller;
use App\Tickets\Admin\Actions\StoreNewTicketAction;
use App\Tickets\Admin\Dtos\CreateTicketDto;
use App\Tickets\Admin\Http\Requests\StoreNewTicketRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class StoreNewTicketController extends Controller
{
    public function __invoke(Event $event, StoreNewTicketRequest $request): RedirectResponse
    {
        $event
            ->tickets()
            ->create($request->validated());

        return Redirect::route('events.show', [
            'event' => $event,
            'panel' => 'tickets',
        ]);
    }
}
