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
            'name' => $this->name,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'location' => $this->location,
            'status' => $this->status,
            'tickets' => [
                'total' => 50,
                'sold' => 25,
                'admissions' => [
                    [
                        'id' => 1,
                        'name' => 'General Admission',
                        'price' => 1000,
                        'quantity' => 10,
                    ],

                ],
                'extras' => [
                    [
                        'id' => 2,
                        'name' => 'VIP',
                        'price' => 2000,
                        'quantity' => 5,
                    ],
                ],
                // 'total' => $this->tickets->count(),
                // 'sold' => $this->tickets->where('sold', true)->count(),
                // 'admissions' => $this->tickets->where('type', 'admission'),
                // 'extras' => $this->tickets->where('type', 'extra'),
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
