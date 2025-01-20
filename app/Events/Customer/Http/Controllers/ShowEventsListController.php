<?php

namespace App\Events\Customer\Http\Controllers;

use App\Events\Shared\Enums\EventStatusEnum;
use App\Events\Shared\Resources\EventResource;
use App\Events\Shared\Models\Event;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

use Inertia\Inertia;

class ShowEventsListController
{

	/**
	 * Display the events list depending on the nearest/selected city.
	 * @param \Illuminate\Http\Request $request
	 * @return mixed|\Illuminate\Http\JsonResponse|\Inertia\Response
	 */
	public function __invoke(Request $request)
	{
		$latitude = $request->input('latitude', 50.8503);
		$longitude = $request->input('longitude', 4.3517);
		$selectedCity = $request->input('city');

		if ($selectedCity) {
			$events = $this->getEventsForSelectedCity($selectedCity);
			[$latitude, $longitude] = $this->getCityCoordinates($selectedCity) ?? [$latitude, $longitude];
		} else {
			$nearestCity = $this->getNearestCity($latitude, $longitude);
			$events = $nearestCity ? $this->getEventsForSelectedCity($nearestCity->city) : [];
			$selectedCity = $nearestCity->city ?? 'Bruxelles';
		}


		$nearestCities = $this->getNearestCities($latitude, $longitude);
		$allCities = $this->getAllCities();

		// Si la requête vient de /api/events, on retourne un JSON
		if ($request->is('api/*')) {
			return response()->json([
				'events' => $events,
				'cities' => $allCities,
				'nearestCities' => $nearestCities,
				'selectedCity' => $selectedCity,
			]);
		}

		return Inertia::render('Events/Customer/Index/View');
	}


	/**
	 * Get events for the selected city.
	 *
	 * @param string $city
	 * @return array
	 */
	private function getEventsForSelectedCity(string $city): array
	{
		return Event::where('city', $city)
			->with('tickets')
			->where('status', EventStatusEnum::PUBLISHED->value)
			->orderBy('start_date', 'asc')
			->get()
			->groupBy(fn($event) => $event->start_date->locale('fr')->translatedFormat('l d M'))
			->map(fn($eventsOnDate) => EventResource::collection($eventsOnDate))
			->toArray();
	}

	/**
	 * Get coordinates for a city.
	 *
	 * @param string $city
	 * @return array|null
	 */
	private function getCityCoordinates(string $city): ?array
	{
		$cityData = DB::table('events')
			->select('latitude', 'longitude')
			->where('city', $city)
			->first();

		return $cityData ? [$cityData->latitude, $cityData->longitude] : null;
	}

	/**
	 * Get the nearest city based on coordinates.
	 *
	 * @param float $latitude
	 * @param float $longitude
	 * @return object|null
	 */
	private function getNearestCity(float $latitude, float $longitude): ?object
	{
		return $this->getCitiesByProximity($latitude, $longitude, 1)->first();
	}


	/**
	 * Get the 5 nearest cities based on coordinates.
	 *
	 * @param float $latitude
	 * @param float $longitude
	 * @return \Illuminate\Support\Collection
	 */
	private function getNearestCities(float $latitude, float $longitude)
	{
		return $this->getCitiesByProximity($latitude, $longitude, 5);
	}

	/**
	 * Get cities ordered by proximity.
	 *
	 * @param float $latitude
	 * @param float $longitude
	 * @param int|null $limit
	 * @return \Illuminate\Support\Collection
	 */
	private function getCitiesByProximity(float $latitude, float $longitude, ?int $limit = null)
	{
		$cacheKey = "nearest_cities_{$latitude}_{$longitude}_limit_{$limit}";

		return collect(
			Cache::remember(
				$cacheKey,
				60,
				function () use ($latitude, $longitude, $limit) {
					$query = "
                    SELECT 
        city, 
        COUNT(*) as event_count,
        MIN(latitude) as latitude,
        MIN(longitude) as longitude,
        (6371 * acos(
            cos(radians(?)) * cos(radians(MIN(latitude))) * cos(radians(MIN(longitude)) - radians(?)) 
            + sin(radians(?)) * sin(radians(MIN(latitude)))
        )) AS distance
    FROM events
    WHERE status = ?
    GROUP BY city
    ORDER BY distance ASC
    " . ($limit ? "LIMIT {$limit}" : "");

					return DB::select($query, [
						$latitude,
						$longitude,
						$latitude,
						EventStatusEnum::PUBLISHED->value
					]);
				}
			)
		);
	}


	/**
	 * Get all distinct cities from events.
	 *
	 * @return array
	 */
	private function getAllCities(): array
	{
		return Event::select('city')->distinct()->pluck('city')->toArray();
	}
}
