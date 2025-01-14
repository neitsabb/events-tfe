<?php

namespace App\Organization\Shared\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class OrganizationResource extends JsonResource
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
			'logo' => Storage::url($this->logo),
			'stripe_account_id' => $this->stripe_account_id,
			'stripe_status' => $this->stripe_status,
			'description' => $this->description,
			'users' => $this->whenLoaded('users'),
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
