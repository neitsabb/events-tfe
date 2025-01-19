<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Http\Requests\UpdateOrganizationRequest;
use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class UpdateOrganizationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateOrganizationRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('organizations', 'public');

            $request->session()->get('selected_organization')->update(['logo' => $logoPath]);
        }

        unset($validated['logo']);

        $request->session()->get('selected_organization')->update($validated);

        return Redirect::back()->with('success', 'L\'organisation a bien été modifiée.');
    }
}
