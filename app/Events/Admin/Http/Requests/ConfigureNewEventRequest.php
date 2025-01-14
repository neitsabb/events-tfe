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
            'organization_id' => $this->session()->get('selected_organization')->id,
        ]);
    }

    public static function rules(): array
    {
        return [
            "location" => "required",
            "coords" => "required|array",
            "start_date" => "required|date",
            "end_date" => "required|date",
            "tickets" => "nullable|array",
            "extras" => "nullable|array",
            "tags" => "nullable|array",
            'image' => 'nullable|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/webp,image/avif|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'location.required' => 'Location is required',
            'coords.required' => 'Coordinates are required',
            'start_date.required' => 'Start date is required',
            'end_date.required' => 'End date is required',
            'tickets.array' => 'Tickets must be an array',
            'extras.array' => 'Extras must be an array',
            'tags.array' => 'Tags must be an array',
            'image.image' => 'Image must be an image',
            'image.mimetypes' => 'Image must be a jpeg, png, jpg, gif, or svg',
            'image.max' => 'Image must be less than 2MB',
        ];
    }
}
