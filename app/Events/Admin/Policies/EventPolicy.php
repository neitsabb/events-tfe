<?php

namespace App\Events\Admin\Policies;

use App\Events\Shared\Models\Event;
use App\User\Models\User;
use Illuminate\Auth\Access\Response;

class EventPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function create(User $user, int $selectedOrganisationId): Response
    {
        $isAdminInOrganisation = $user->organizations()
            ->where('organizations.id', $selectedOrganisationId)
            ->where('organization_user.role', 'admin')
            ->orWhere('organization_user.role', 'owner')
            ->exists();

        return $isAdminInOrganisation
            ? Response::allow()
            : Response::deny('Vous n\'avez pas les droits pour créer un événement.');
    }

    public function view(User $user, Event $event): Response
    {
        // Récupérer l'organisation_id depuis la session
        $selectedOrganisationId = session()->get('selected_organization')->id;

        // Vérifier que l'utilisateur appartient à l'organisation associée à l'événement
        $isUserInOrganisation = $user->organizations()->where('organizations.id', $selectedOrganisationId)->exists();

        // Vérifier que l'organisation de l'événement correspond à celle stockée dans la session
        $isEventInOrganisation = $event->organization_id === $selectedOrganisationId;

        if ($isUserInOrganisation && $isEventInOrganisation) {
            return Response::allow();
        }

        return Response::deny('Vous n\'avez pas les droits pour accéder à cet événement.');
    }
}
