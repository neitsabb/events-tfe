<?php

namespace App\Tickets\Admin\Http\Controllers;

use App\Shared\Http\Controller;
use App\Tickets\Admin\Actions\UpdateTicketAction;
use App\Tickets\Admin\Dtos\UpdateTicketDto;
use App\Tickets\Admin\Http\Requests\StoreNewTicketRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class UpdateTicketController extends Controller
{
	public function __invoke($id, StoreNewTicketRequest $request): RedirectResponse
	{
		(new UpdateTicketAction)
			->execute(
				UpdateTicketDto::from([
					...$request->validated(),
				])
			);

		return Redirect::route('events.show', [
			'id' => $id,
			'panel' => 'tickets',
		]);
	}
}
