<?php

namespace Database\Factories\Tickets\Shared\Models;


use App\Tickets\Admin\Enums\TicketTypeEnum;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Event>
 */
class TicketFactory extends Factory
{

	protected $model = Ticket::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'name' => "Ticket" . $this->faker->randomNumber(1),
			'type' => $this->faker->randomElement(TicketTypeEnum::toArray()),
			'price' => $this->faker->randomFloat(2, 40, 80),
			"quantity" => random_int(0, 100)
		];
	}
}
