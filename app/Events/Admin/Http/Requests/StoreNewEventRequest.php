<?php

namespace App\Events\Admin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNewEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO - implement authorization
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            // 'start_date' => date('Y-m-d H:i:s', strtotime($this['start_date'])),
            // 'end_date' => $this['end_date'] ? date('Y-m-d H:i:s',  strtotime($this['end_date'])) : date('Y-m-d H:i:s', strtotime($this['start_date'])),
            'user_id' => auth()->id(),
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
            'user_id' => ['required', 'integer'],
            // 'start_date' => ['required', 'date'],
            // 'end_date' => ['date', 'nullable'],
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
