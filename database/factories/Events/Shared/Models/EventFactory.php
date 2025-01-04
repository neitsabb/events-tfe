<?php

namespace Database\Factories\Events\Shared\Models;

use App\Events\Shared\Enums\EventStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Events\Shared\Models\Event>
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

	private $belgiumCities = [
		['city' => 'Bruxelles', 'latitude' => 50.8503, 'longitude' => 4.3517, 'zip_code' => '1000'],
		['city' => 'Anvers', 'latitude' => 51.2194, 'longitude' => 4.4025, 'zip_code' => '2000'],
		['city' => 'Gand', 'latitude' => 51.0543, 'longitude' => 3.7174, 'zip_code' => '9000'],
		['city' => 'Liège', 'latitude' => 50.6292, 'longitude' => 5.5797, 'zip_code' => '4000'],
		['city' => 'Charleroi', 'latitude' => 50.4108, 'longitude' => 4.4446, 'zip_code' => '6000'],
		['city' => 'Namur', 'latitude' => 50.4669, 'longitude' => 4.8675, 'zip_code' => '5000'],
		['city' => 'Mons', 'latitude' => 50.4542, 'longitude' => 3.9567, 'zip_code' => '7000'],
		['city' => 'Tournai', 'latitude' => 50.6071, 'longitude' => 3.3899, 'zip_code' => '7500'],
		['city' => 'Leuven', 'latitude' => 50.8798, 'longitude' => 4.7005, 'zip_code' => '3000'],
		['city' => 'Hasselt', 'latitude' => 50.9307, 'longitude' => 5.3322, 'zip_code' => '3500'],
	];

	private $franceCities = [
		['city' => 'Paris', 'latitude' => 48.8566, 'longitude' => 2.3522, 'zip_code' => '75001'],
		['city' => 'Lyon', 'latitude' => 45.7640, 'longitude' => 4.8357, 'zip_code' => '69001'],
		['city' => 'Marseille', 'latitude' => 43.2965, 'longitude' => 5.3698, 'zip_code' => '13001'],
		['city' => 'Toulouse', 'latitude' => 43.6047, 'longitude' => 1.4442, 'zip_code' => '31000'],
		['city' => 'Nice', 'latitude' => 43.7102, 'longitude' => 7.2620, 'zip_code' => '06000'],
		['city' => 'Nantes', 'latitude' => 47.2184, 'longitude' => -1.5536, 'zip_code' => '44000'],
		['city' => 'Strasbourg', 'latitude' => 48.5734, 'longitude' => 7.7521, 'zip_code' => '67000'],
		['city' => 'Montpellier', 'latitude' => 43.6108, 'longitude' => 3.8767, 'zip_code' => '34000'],
		['city' => 'Bordeaux', 'latitude' => 44.8378, 'longitude' => -0.5792, 'zip_code' => '33000'],
		['city' => 'Lille', 'latitude' => 50.6292, 'longitude' => 3.0573, 'zip_code' => '59000'],
	];

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		$isBelgium = $this->faker->boolean(50);
		$selectedCity = $isBelgium
			? $this->faker->randomElement($this->belgiumCities)
			: $this->faker->randomElement($this->franceCities);

		return [
			'id' => $this->faker->uuid(),
			'slug' => $this->faker->slug(),
			'image' => $this->faker->randomElement($this->images),
			'name' => $this->faker->sentence(3),
			'description' => $this->faker->paragraph(),
			'start_date' => $this->faker->dateTimeBetween('now', '+1 month'),
			'end_date' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
			'street' => $this->faker->streetAddress(),
			'city' => $selectedCity['city'],
			'zip_code' => $selectedCity['zip_code'],
			'latitude' => $selectedCity['latitude'],
			'longitude' => $selectedCity['longitude'],
			'country' => $isBelgium ? 'Belgique' : 'France',
			'status' => $this->faker->randomElement(EventStatusEnum::toArray()),
		];
	}
}
