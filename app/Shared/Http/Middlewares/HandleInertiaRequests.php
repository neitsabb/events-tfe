<?php

namespace App\Shared\Http\Middlewares;

use App\Events\Shared\Models\Event;
use App\Organization\Shared\Models\Organization;
use App\Organization\Shared\Resources\OrganizationResource;
use App\User\Models\User;
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
        // Récupérer l'ID de l'organisation sélectionnée depuis la session
        $selectedOrganization = $request->session()->get('selected_organization');
        $selectedOrganizationId = $selectedOrganization ? $selectedOrganization->id : null;

        // Récupérer l'événement si l'ID de l'événement est présent dans la requête
        $event = $request->route('event'); // Ajustez cela selon comment vous récupérez l'événement


        // if ($event) {
        //     $event = Event::find($event);
        //     // Debuggez l'événement pour vous assurer qu'il est valide
        //     dd($event, Gate::inspect('view', $event)->allowed(), $selectedOrganizationId, Gate::inspect('archive', $event)->allowed());
        // }


        $event = $event ? Event::find($event) : null;
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'organizationLogged' => $selectedOrganization ? OrganizationResource::make($selectedOrganization->load('users')) : null,
                'organizations' => $request->user()?->organizations,
            ],
            'permissions' => [
                'event' => [
                    'view' => $event ? Gate::inspect('view', $event)->allowed() : false,
                    'create' => Gate::inspect('create', Event::class)->allowed(),
                    'settings' => $event ? Gate::inspect('settings', $event)->allowed() : false,
                ],
                'organization' => [
                    'settings' => $selectedOrganizationId ? Gate::inspect('settings', Organization::find($selectedOrganizationId))->allowed() : false,
                ]
            ],
            'flash' => [
                'user' => fn() => $request->session()->get('user'),
            ]
        ];
    }
}
