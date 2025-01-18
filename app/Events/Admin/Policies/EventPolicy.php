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

        $isUserInOrganization = $user->organizations->contains('id', $selectedOrganizationId);
        $isEventInOrganization = $event->organization_id === $selectedOrganizationId;

        return ($isUserInOrganization && $isEventInOrganization)
            ? Response::allow()
            : Response::deny('Vous n\'avez pas les droits pour accéder à cet événement.');
    }

    public function isAdminOrOwner(User $user): bool
    {
        $selectedOrganizationId = session()->get('selected_organization')->id;

        return $user->organizations->contains(function ($organization) use ($selectedOrganizationId) {
            return $organization->id === $selectedOrganizationId &&
                in_array($organization->pivot->role, ['admin', 'owner']);
        });
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
