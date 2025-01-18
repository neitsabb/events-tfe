<?php

namespace App\User\Resources;

use App\Organization\Shared\Resources\OrganizationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
			'firstname' => $this->firstname,
			'lastname' => $this->lastname,
			'birthday' => $this->birthday,
			'email' => $this->email,
			'image' => Storage::url($this->image),
			'organizations' => OrganizationResource::collection($this->organizations),
			'created_at' => $this->created_at,
		];
	}
}
