<?php

namespace App\Tickets\Admin\Dtos;

use App\Events\Shared\Models\Event;
use App\Tickets\Admin\Enums\TicketTypeEnum;

final class CreateTicketDto
{
	public function __construct(
		public string $event_id,
		public string $type,
		public string $name,
		public ?string $description,
		public int $quantity,
		public float $price,
	) {
		if (!in_array($this->type, TicketTypeEnum::toArray())) {
			throw new \InvalidArgumentException("Le type de billet n'existe pas.");
		}
	}

	public static function from(array $data): self
	{
		return new self(
			event_id: $data['event_id'],
			type: $data['type'],
			name: $data['name'],
			description: $data['description'] ?? null,
			quantity: $data['quantity'],
			price: $data['price'],
		);
	}

	public function toArray(): array
	{
		return [
			'event_id' => $this->event_id,
			'type' => $this->type,
			'name' => $this->name,
			'description' => $this->description,
			'quantity' => $this->quantity,
			'price' => $this->price,
		];
	}
}
