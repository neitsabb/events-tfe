<?php

namespace App\Tickets\Admin\Actions;

use App\Events\Shared\Models\Event;
use App\Tickets\Admin\Dtos\CreateTicketDto;
use App\Tickets\Admin\Dtos\UpdateTicketDto;
use App\Tickets\Shared\Models\Ticket;

class UpdateTicketAction
{
	/**
	 * Update the specified resource in storage.
	 */
	public function execute(UpdateTicketDto $dto): void
	{
		$ticket = Ticket::findOrFail($dto->ticket_id);

		$ticket->update($dto->toArray());
	}
}
