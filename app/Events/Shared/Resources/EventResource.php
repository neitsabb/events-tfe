<?php

namespace App\Events\Shared\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'location' => [
                'street' => $this->street,
                'city' => $this->city,
                'zip_code' => $this->zip_code,
                'country' => $this->country,
            ],
            'status' => $this->status,
            'image' => $this->image,
            'coords' => [
                'lat' => $this->latitude,
                'lng' => $this->longitude,
            ],
            'tickets' => [
                'total' => $this->tickets->count(),
                'sold' => $this->tickets->where('sold', true)->count(),
                'admissions' => $this->tickets->where('type', 'admission'),
                'extras' => $this->tickets->where('type', 'extra'),
            ],
            'preferences' => $this->formatPreferences($this->preferences),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    protected function formatPreferences($preferences): array
    {
        if ($preferences instanceof \Illuminate\Database\Eloquent\Collection) {
            // Convert collection of preference objects to array
            return $preferences->map(function ($preference) {
                // Decode the JSON value if it's a string
                $value = $preference->value;
                $decodedValue = $this->decodeJson($value);

                return [
                    'key' => $preference->key,
                    'value' => $decodedValue,
                ];
            })->toArray();
        }

        // Handle other types if necessary
        return [];
    }

    protected function decodeJson(string $value)
    {
        // Decode JSON string, if it's valid JSON
        json_decode($value);
        return json_last_error() === JSON_ERROR_NONE ? json_decode($value, true) : $value;
    }
}
