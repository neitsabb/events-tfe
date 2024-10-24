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
    public function create(User $user): Response
    {
        return $this->isAdminOrOwner($user)
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

    public function isAdminOrOwner(User $user): bool
    {
        return $user->organizations()
            ->where('organizations.id', session()->get('selected_organization')->id)
            ->where(function ($query) {
                $query->where('organization_user.role', 'admin')
                    ->orWhere('organization_user.role', 'owner');
            })
            ->exists();
    }

    public function settings(User $user): Response
    {
        return $this->isAdminOrOwner($user)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à modifier les paramètres de cet événement.');
    }

    public function archive(User $user): Response
    {
        return $this->isAdminOrOwner($user)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à archiver cet événement.');
    }

    public function unarchive(User $user): Response
    {
        return $this->isAdminOrOwner($user)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à désarchiver cet événement.');
    }

    public function delete(User $user): Response
    {
        return $this->isAdminOrOwner($user)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à supprimer cet événement.');
    }

    public function create_ticket(User $user): Response
    {
        return $this->isAdminOrOwner($user)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à créer un billet pour cet événement.');
    }

    public function edit_ticket(User $user): Response
    {
        return $this->isAdminOrOwner($user)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à modifier un billet pour cet événement.');
    }

    public function delete_ticket(User $user): Response
    {
        return $this->isAdminOrOwner($user)
            ? Response::allow()
            : Response::deny('Vous n\'êtes pas autorisé à supprimer un billet pour cet événement.');
    }
}
