<?php

namespace App\Organization\Admin\Policies;

use App\Organization\Shared\Models\Organization;
use App\User\Models\User;
use Illuminate\Auth\Access\Response;

class OrganizationPolicy
{
    /**
     * Vérifie si l'utilisateur a le rôle requis pour une organisation donnée.
     */
    protected function hasRole(User $user, Organization $organization, array $roles): bool
    {
        return $user->organizations->contains(function ($org) use ($organization, $roles) {
            return $org->id === $organization->id && in_array($org->pivot->role, $roles);
        });
    }

    public function view(User $user, Organization $organization): Response
    {
        return $this->hasRole($user, $organization, ['admin', 'owner'])
            ? Response::allow()
            : Response::deny('Vous n\'avez pas les droits pour accéder à cette organisation.');
    }

    public function settings(User $user, Organization $organization): Response
    {
        return $this->hasRole($user, $organization, ['admin', 'owner'])
            ? Response::allow()
            : Response::deny('Vous n\'avez pas les droits pour accéder aux paramètres de l\'organisation.');
    }

    public function connect(User $user, Organization $organization): Response
    {
        return $this->hasRole($user, $organization, ['owner'])
            ? Response::allow()
            : Response::deny('Vous n\'avez pas les droits pour configurer Stripe.');
    }

    public function invite(User $user, Organization $organization): Response
    {
        return $this->hasRole($user, $organization, ['admin', 'owner'])
            ? Response::allow()
            : Response::deny('Vous n\'avez pas les droits pour inviter des utilisateurs.');
    }
}
