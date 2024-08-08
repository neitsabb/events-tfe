<?php

namespace App\Tickets\Admin\Actions;

use App\Events\Shared\Models\Event;
use App\Tickets\Admin\Dtos\CreateTicketDto;

class StoreNewTicketAction
{
	/**
	 * Store a newly created resource in storage.
	 */
	public function execute(CreateTicketDto $dto)
	{
		$event = Event::findOrFail($dto->event_id);

		$event->tickets()->create($dto->toArray());

		return $event;
	}
}
