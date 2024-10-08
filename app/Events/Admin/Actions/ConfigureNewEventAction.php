<?php

namespace App\Events\Admin\Actions;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Enums\EventStatusEnum;
use App\Tickets\Admin\Enums\TicketTypeEnum;

class ConfigureNewEventAction
{
	/**
	 * Update a newly created resource in storage.
	 */
	public function execute(Event $event, array $data): bool
	{
		$event->tickets()->createMany(
			collect($data['tickets'])
				->map(fn($ticket) => $ticket + ['type' => TicketTypeEnum::ADMISSION])
		);

		$event->tickets()->createMany(
			collect($data['extras'])
				->map(fn($ticket) => $ticket + ['type' => TicketTypeEnum::EXTRA])
		);

		unset($data['tickets'], $data['extras']);

		return $event->update([
			"status" => EventStatusEnum::DRAFT,
			...$data
		]);
	}
}
