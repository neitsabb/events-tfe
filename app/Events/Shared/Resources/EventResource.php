<?php

namespace App\Events\Shared\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'image' => Storage::url($this->image),
            'coords' => [
                'lat' => $this->latitude,
                'lng' => $this->longitude,
            ],
            'tickets' => $this->whenLoaded('tickets', function () {
                return [
                    'participants' => $this->tickets->where('type', 'admission')->sum(function ($ticket) {
                        return $ticket->transactions->count(); // Compte toutes les transactions
                    }),
                    'total_sold' => $this->tickets->sum(function ($ticket) {
                        return $ticket->transactions->count(); // Compte toutes les transactions
                    }),
                    'admissions' => $this->tickets->where('type', 'admission'),
                    'extras' => $this->tickets->where('type', 'extra'),
                ];
            }) ?? [],
            'price' => $this->whenLoaded('tickets', function () {
                return $this->tickets
                    ->where('type', 'admission')
                    ->filter(function ($ticket) {
                        return $ticket->sold < $ticket->quantity; // Ne garder que les tickets non épuisés
                    })
                    ->min('price'); // Prendre le prix minimum parmi les tickets restants
            }) ?? 'sold_out',
            'preferences' => $this->whenLoaded('preferences', function () {
                return $this->formatPreferences($this->preferences);
            }) ?? [],
            'transactions' => $this->whenLoaded('transactions', function () {
                return $this->transactions->sortByDesc('created_at')->map(function ($transaction) {
                    return [
                        'id' => $transaction->id,
                        'name' => $transaction->user->name,
                        'userImage' => Storage::url($transaction->user->image),
                        'amount' => $transaction->amount,
                        'status' => $transaction->is_completed ? 'completed' : 'pending',
                        'tickets_count' => $transaction->tickets->count(),
                        'created_at' => $transaction->created_at,
                    ];
                })->toArray();
            }) ?? [],
            'organization' => $this->whenLoaded('organization', function () {
                return [
                    'name' => $this->organization->name,
                    'events_count' => $this->organization->events->count(),
                    'logo' => Storage::url($this->organization->logo),
                ];
            }),
            'tags' => $this->whenLoaded('tags', function () {
                return $this->tags->pluck('name');
            }) ?? [],
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
