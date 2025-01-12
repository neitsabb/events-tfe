<?php

namespace Database\Factories\Organization\Shared\Models;

use App\Organization\Shared\Enums\OrganizationTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;


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
			'name' => 'Organization Test',
			'description' => 'Organization Test Description',
			'type' => OrganizationTypeEnum::ENTERPRISE->value,
			'logo' => 'Organization Test Logo',
		];
	}
}
