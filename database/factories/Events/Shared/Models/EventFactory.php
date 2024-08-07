<?php

namespace Database\Factories\Events\Shared\Models;

use App\Events\Shared\Enums\EventStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Event>
 */
class EventFactory extends Factory
{

	protected $model = \App\Events\Shared\Models\Event::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'id' => $this->faker->uuid(),
			'name' => $this->faker->name(),
			'description' => $this->faker->text(),
			'start_date' => $this->faker->dateTimeBetween('now', '+1 month'),
			'end_date' => $this->faker->dateTimeBetween('+1 month', '+2 month'),
			'location' => $this->faker->address,
			'status' => $this->faker->randomElement(EventStatusEnum::toArray()),
			'user_id' => 1,
		];
	}
}
