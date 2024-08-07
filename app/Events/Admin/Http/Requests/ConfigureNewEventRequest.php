<?php

namespace App\Events\Admin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfigureNewEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            'start_date' => date('Y-m-d H:i:s', strtotime($this['start_date'])),
            'end_date' => $this->has('end_date') ? date('Y-m-d H:i:s',  strtotime($this['end_date'])) : date('Y-m-d H:i:s', strtotime($this['start_date'])),
            'user_id' => auth()->id(),
        ]);
    }

    public static function rules(): array
    {
        return [
            "location" => "required|string",
            "start_date" => "required|date",
            "end_date" => "required|date",
            "tickets" => "nullable|array",
            "extras" => "nullable|array",
        ];
    }
}
