<?php

namespace App\Events\Admin\Policies;

use App\Events\Shared\Models\Event;
use App\User\Models\User;
use Illuminate\Auth\Access\Response;

class EventPolicy
{
    public function __construct()
    {
        //
    }

    private function isAdminOrOwner(User $user, int $organizationId): bool
    {
        return $user->organizations()
            ->where('organizations.id', $organizationId)
            ->where(function ($query) {
                $query->where('organization_user.role', 'admin')
                    ->orWhere('organization_user.role', 'owner');
            })
            ->exists();
    }

    public function create(User $user): Response
    {
        $selectedOrganizationId = session()->get('selected_organization')->id;
        return $this->isAdminOrOwner($user, $selectedOrganizationId)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à créer cet événement.');
    }

    public function view(User $user, Event $event): Response
    {
        $selectedOrganizationId = session()->get('selected_organization')->id;

        // Vérifier que l'utilisateur appartient à l'organisation associée à l'événement
        $isUserInOrganization = $user->organizations()->where('organizations.id', $selectedOrganizationId)->exists();

        // Vérifier que l'organisation de l'événement correspond à celle stockée dans la session
        $isEventInOrganization = $event->organization_id === $selectedOrganizationId;

        return ($isUserInOrganization && $isEventInOrganization)
            ? Response::allow()
            : Response::deny('Vous n\'avez pas les droits pour accéder à cet événement.');
    }

    public function settings(User $user, Event $event): Response
    {
        return $this->isAdminOrOwner($user, $event->organization_id)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à modifier les paramètres de cet événement.');
    }

    public function archive(User $user, Event $event): Response
    {
        return $this->isAdminOrOwner($user, $event->organization_id)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à archiver cet événement.');
    }

    public function unarchive(User $user, Event $event): Response
    {
        return $this->isAdminOrOwner($user, $event->organization_id)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à désarchiver cet événement.');
    }

    public function delete(User $user, Event $event): Response
    {
        return $this->isAdminOrOwner($user, $event->organization_id)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à supprimer cet événement.');
    }
}
