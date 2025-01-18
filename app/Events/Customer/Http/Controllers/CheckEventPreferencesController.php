<?php

namespace App\Events\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use Illuminate\Http\Request;

class CheckEventPreferencesController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(Request $request)
    {
        $validationRules = $this->buildValidationRules(
            session('event')->preferences
        );

        $validated = $request->validate($validationRules, [
            'legal_age.required' => 'L\'âge est obligatoire.',
            'legal_age.integer' => 'L\'âge doit être un nombre entier.',
            'legal_age.min' => 'Vous devez avoir plus de :min ans pour participer à cet événement.',

            'email.email' => 'L\'adresse email doit être valide.',
            'email.required' => 'L\'adresse email est obligatoire.',

            'phone.required' => 'Le numéro de téléphone est obligatoire.',
            'phone.string' => 'Le numéro de téléphone doit être une chaîne de caractères.',
        ]);
    }

    private function buildValidationRules($preferences)
    {
        $rules = [];


        foreach ($preferences as $preference) {
            if ($preference->value === "") {
                continue;
            }
            switch ($preference->key) {
                case 'legal_age':
                    $rules['legal_age'] = 'required|integer|min:' . $preference->value;
                    break;

                case 'required_fields':
                    $fields = json_decode($preference->value, true);
                    if (is_array($fields)) {
                        foreach ($fields as $field) {
                            $rules[$field] = 'required|string';
                            if ($field === 'email') {
                                $rules[$field] .= '|email';
                            }
                            // Add more rules if necessary
                        }
                    }
                    break;

                default:
                    // Ajoutez d'autres cas si nécessaire
                    break;
            }
        }

        return $rules;
    }
}
