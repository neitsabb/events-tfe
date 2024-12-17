<?php

namespace Database\Factories\Artists\Shared\Models;

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Artist>
 */
class ArtistFactory extends Factory
{

	protected $model = \App\Artists\Shared\Models\Artist::class;


	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'slug' => $this->faker->slug(),
			'name' => $this->faker->name(),
			'image' => $this->faker->imageUrl(),
		];
	}
}
