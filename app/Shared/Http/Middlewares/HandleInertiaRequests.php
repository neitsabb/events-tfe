<?php

namespace App\Shared\Http\Middlewares;

use App\Events\Shared\Models\Event;
use App\Organization\Shared\Resources\OrganizationResource;
use App\User\Models\User;
use App\User\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
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
        $selectedOrganization = $request->session()->get('selected_organization')?->load('users');
        $event = $request->route('event') ? Event::withTrashed()->find($request->route('event')) : null;

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? UserResource::make($request->user()) : null,
                'organizationLogged' => $selectedOrganization ? OrganizationResource::make($selectedOrganization) : null,
            ],

            'permissions' =>  $selectedOrganization ? [
                'event' => [
                    'view' => Gate::inspect('view', $event)->allowed(),
                    'create' => Gate::inspect('create', Event::class)->allowed(),
                    'settings' => Gate::inspect('settings', $event)->allowed(),
                    'tickets' => [
                        'create' => Gate::inspect('create_ticket', $event)->allowed(),
                        'edit' => Gate::inspect('edit_ticket', $event)->allowed(),
                        'delete' => Gate::inspect('delete_ticket', $event)->allowed(),
                    ]
                ],
                'organization' => [
                    'connect' => Gate::inspect('connect', $selectedOrganization)->allowed(),
                    'settings' => Gate::inspect('settings', $selectedOrganization)->allowed(),
                ]
            ] : [],

            'flash' => [

                'user' => fn() => $request->session()->get('user'),
                'success' => fn() => $request->session()->get('success'),
            ]
        ];
    }
}
