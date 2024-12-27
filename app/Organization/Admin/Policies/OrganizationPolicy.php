<?php

namespace App\Organization\Admin\Policies;

use App\Organization\Shared\Models\Organization;
use App\User\Models\User;
use Illuminate\Auth\Access\Response;

class OrganizationPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, Organization $organization): Response
    {
        if ($user
            ->organizations()
            ->where('organizations.id', $organization->id)
            ->where('organizations_users.role', 'admin')
            ->orWhere('organizations_users.role', 'owner')
            ->exists()
        ) {
            return Response::allow();
        }

        return Response::deny('Vous n\'avez pas les droits pour accéder à cette organisation.');
    }

    public function settings(User $user, Organization $organization): Response
    {
        if ($user
            ->organizations()
            ->where('organizations.id', $organization->id)
            ->where('organizations_users.role', 'admin')
            ->orWhere('organizations_users.role', 'owner')
            ->exists()
        ) {
            return Response::allow();
        }

        return Response::deny('Vous n\'avez pas les droits pour accéder aux paramètres de l\'organisation.');
    }

    public function connect(User $user, Organization $organization): Response
    {
        if ($user
            ->organizations()
            ->where('organizations.id', $organization->id)
            ->where('organizations_users.role', 'owner')
            ->exists()
        ) {
            return Response::allow();
        }

        return Response::deny('Vous n\'avez pas les droits pour configurer Stripe.');
    }

    public function invite(User $user, Organization $organization): Response
    {
        if ($user
            ->organizations()
            ->where('organizations.id', $organization->id)
            ->where('organizations_users.role', 'owner')
            ->orWhere('organizations_users.role', 'admin')
            ->exists()
        ) {
            return Response::allow();
        }

        return Response::deny('Vous n\'avez pas les droits pour inviter des utilisateurs.');
    }
}
