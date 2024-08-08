<?php

namespace App\Tickets\Admin\Http\Requests;

use Illuminate\Validation\Rule;
use App\Tickets\Admin\Enums\TicketTypeEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreNewTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function prepareForValidation(): void
    {
        if ($this->has('ticketId'))
            $this->merge([
                'ticket_id' => $this->ticketId,
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
            'type' => ['required', Rule::in(TicketTypeEnum::toArray())],
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'quantity' => ['required', 'numeric', 'min:1'],
            'price' => ['required', 'numeric'],
            'ticket_id' => ['nullable', 'exists:tickets,id'],
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
            'type.required' => 'Le type de billet est requis.',
            'type.enum' => "Le type de billet n'existe pas.",
            'name.required' => 'Le nom du billet est requis.',
            'name.string' => 'Le nom du billet doit être une chaîne de caractères.',
            'description.string' => 'La description du billet doit être une chaîne de caractères.',
            'quantity.required' => 'La quantité de billets est requise.',
            'quantity.numeric' => 'La quantité de billets doit être un entier.',
            'quantity.min' => 'La quantité de billets doit être supérieure à 0.',
            'price.required' => 'Le prix du billet est requis.',
            'price.numeric' => 'Le prix du billet doit être un nombre.',
            'ticket_id.exists' => 'Le billet n\'existe pas.',
        ];
    }
}
