<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Shared\Http\Controller;
use App\Tickets\Admin\Actions\StoreNewTicketAction;
use App\Tickets\Admin\Dtos\CreateTicketDto;
use App\Tickets\Admin\Http\Requests\StoreNewTicketRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class StoreNewTicketController extends Controller
{
    public function __invoke($id, StoreNewTicketRequest $request): RedirectResponse
    {
        $event = (new StoreNewTicketAction)
            ->execute(
                CreateTicketDto::from([
                    'event_id' => $id,
                    ...$request->validated(),
                ])
            );

        return Redirect::route('events.show', [
            'id' => $event->id,
            'panel' => 'tickets',
        ]);
    }
}
