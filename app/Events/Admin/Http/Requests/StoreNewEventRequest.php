<?php

namespace App\Events\Admin\Http\Requests;

use App\Events\Shared\Models\Event;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreNewEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): mixed
    {
        return Gate::allows('create', [Event::class, session()->get('selected_organization')->id]);
    }

    public function prepareForValidation()
    {
        $this->merge([
            // 'start_date' => date('Y-m-d H:i:s', strtotime($this['start_date'])),
            // 'end_date' => $this['end_date'] ? date('Y-m-d H:i:s',  strtotime($this['end_date'])) : date('Y-m-d H:i:s', strtotime($this['start_date'])),
            'organization_id' => $this->session()->get('selected_organization')->id,
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'organization_id' => ['required', 'integer', 'exists:organizations,id'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est requis.',
            'description.required' => 'La description est requise.',
            'start_date.required' => 'La date de début est requise.',

            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'description.string' => 'La description doit être une chaîne de caractères.',

            'start_date.date' => 'La date de début doit être une date',
            'end_date.date' => 'La date de fin doit être une date.',
        ];
    }
}
