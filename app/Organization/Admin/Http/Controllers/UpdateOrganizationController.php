<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Http\Requests\CreateOrganizationRequest;
use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class UpdateOrganizationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Update organization

        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string|max:255',
            'type' => 'required|string',
            'logo' => [
                'nullable',
                function ($attribute, $value, $fail) use ($request) {
                    // Vérifier si c'est un chemin existant
                    if (is_string($value) && preg_match('#^/storage/organizations/#', $value)) {
                        return;
                    }

                    // Si ce n'est pas un chemin, vérifier si c'est un fichier valide
                    if ($request->hasFile('logo')) {
                        $file = $request->file('logo');
                        if (!$file->isValid()) {
                            $fail('Le fichier du logo n\'est pas valide.');
                        } elseif (!in_array($file->getMimeType(), ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/avif'])) {
                            $fail('Le fichier doit être une image valide.');
                        } elseif ($file->getSize() > 2048 * 1024) {
                            $fail('Le fichier du logo ne doit pas dépasser 2 Mo.');
                        }
                    } else {
                        // Si ce n'est ni un chemin valide ni un fichier envoyé, échouer
                        $fail('Le champ logo doit être un fichier valide ou un chemin existant.');
                    }
                },
            ],
            'website' => 'nullable|string',
        ]);

        // $validated = $request->validated();

        if ($request->hasFile('logo') && $request->logo instanceof \Illuminate\Http\UploadedFile) {
            $validated['logo'] = Storage::disk('public')->put('organizations', $validated['logo']);
            $request->session()->get('selected_organization')->update(['logo' => $validated['logo']]);
        }

        unset($validated['logo']);

        $request->session()->get('selected_organization')->update($validated);


        return Redirect::back()->with('success', 'L\'organisation a bien été modifiée.');
    }
}
