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

		$event->update(
			collect($data['location'])
				->only(['street', 'city', 'zip_code', 'country'])
				->toArray()
		);

		unset($data['location']);

		$event->update(["latitude" => $data['coords']['lat']]);
		$event->update(["longitude" =>  $data['coords']['lng']]);

		unset($data['coords']);

		$event->tags()->createMany(
			collect($data['tags'])
				->map(fn($tag) => ['name' => $tag])
		);

		unset($data['tags']);

		return $event->update([
			"status" => EventStatusEnum::DRAFT,
			...$data
		]);
	}
}
