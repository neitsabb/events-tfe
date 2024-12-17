<?php

namespace App\User\Resources;

use App\Organization\Shared\Resources\OrganizationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
			'email' => $this->email,
			'organizations' => OrganizationResource::collection($this->organizations),
			'created_at' => $this->created_at,
		];
	}
}
