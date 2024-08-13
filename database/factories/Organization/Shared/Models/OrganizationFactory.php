<?php

namespace Database\Factories\Events\Shared\Models;

use App\Events\Shared\Enums\EventStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Event>
 */
class OrganizationFactory extends Factory
{

	protected $model = \App\Organization\Shared\Models\Organization::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'name' => 'Organization Test'
		];
	}
}
