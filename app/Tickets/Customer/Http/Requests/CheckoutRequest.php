<?php

namespace App\Tickets\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'admissions' => 'sometimes|array',
			'admissions.*.id' => 'required|integer|exists:tickets,id',
			'admissions.*.name' => 'required|string',
			'admissions.*.price' => 'required|numeric|min:0',
			'admissions.*.quantity' => 'required|integer|min:1',
			'extras' => 'sometimes|array',
			'extras.*.id' => 'required|integer|exists:tickets,id',
			'extras.*.name' => 'required|string',
			'extras.*.price' => 'required|numeric|min:0',
			'extras.*.quantity' => 'required|integer|min:1',
		];
	}
}
