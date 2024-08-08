<?php

namespace App\Tickets\Admin\Dtos;

use App\Events\Shared\Models\Event;

final class UpdateTicketDto
{
	public function __construct(
		public string $ticket_id,
		public string $type,
		public string $name,
		public ?string $description,
		public int $quantity,
		public float $price,
	) {}

	public static function from(array $data): self
	{
		return new self(
			ticket_id: $data['ticket_id'],
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
			'ticket_id' => $this->ticket_id,
			'type' => $this->type,
			'name' => $this->name,
			'description' => $this->description,
			'quantity' => $this->quantity,
			'price' => $this->price,
		];
	}
}
