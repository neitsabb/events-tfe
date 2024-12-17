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

	private $images = [
		"https://shotgun.live/events/white-garden-comines",
		"https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_640/v1722927596/production/artworks/240913_UNFACED_EVENT_FACEBOOK_csgbbw",
		"https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_640/v1713944883/production/artworks/IMG_2885_cbmskk",
		"https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_640/v1721385705/production/artworks/LRFest_tpxnzv",
		"https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_640/v1721129122/production/artworks/SAMEDI-21-09-FB_jnrvom"
	];

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'id' => $this->faker->uuid(),
			'slug' => $this->faker->slug(),
			'image' => $this->faker->randomElement($this->images),
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
