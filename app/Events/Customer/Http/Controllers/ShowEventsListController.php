<?php

namespace App\Events\Customer\Http\Controllers;

use App\Events\Shared\Enums\EventStatusEnum;
use App\Events\Shared\Resources\EventResource;
use Inertia\Inertia;
use App\Shared\Http\Controller;
use App\Events\Shared\Models\Event;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ShowEventsListController extends Controller
{
	/**
	 * Handle the incoming request.
	 *
	 * @param Request $request
	 * @return \Inertia\Response
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

		return Inertia::render('Events/Customer/Index/View', [
			'events' => $events,
			'cities' => $allCities,
			'nearestCities' => $nearestCities,
			'selectedCity' => $selectedCity,
		]);
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
		$query = "
        SELECT city, MIN(distance) as distance 
        FROM (
            SELECT city, 
            (6371 * acos(
                cos(radians(?)) 
                * cos(radians(latitude)) 
                * cos(radians(longitude) - radians(?)) 
                + sin(radians(?)) 
                * sin(radians(latitude))
            )) AS distance 
            FROM events
        ) AS distances
        GROUP BY city 
        ORDER BY distance ASC 
        LIMIT 1
    ";

		$result = DB::select($query, [$latitude, $longitude, $latitude]);

		return $result[0] ?? null;
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
		$query = "
        SELECT city, MIN(distance) as distance 
        FROM (
            SELECT city, 
            (6371 * acos(
                cos(radians(?)) 
                * cos(radians(latitude)) 
                * cos(radians(longitude) - radians(?)) 
                + sin(radians(?)) 
                * sin(radians(latitude))
            )) AS distance 
            FROM events
        ) AS distances
        GROUP BY city 
        ORDER BY distance ASC 
        LIMIT 5
    ";

		return collect(DB::select($query, [$latitude, $longitude, $latitude]));
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
