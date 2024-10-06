<?php

namespace App\Shared\Http\Middlewares;

use App\Organization\Shared\Resources\OrganizationResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'organizationLogged' => $request->session()->get('selected_organization') ? OrganizationResource::make($request->session()->get('selected_organization')?->load('users')) : null,
                'organizations' => $request->user()?->organizations,
            ],
            'flash' => [
                'user' => fn() => $request->session()->get('user'),
            ]
        ];
    }
}
