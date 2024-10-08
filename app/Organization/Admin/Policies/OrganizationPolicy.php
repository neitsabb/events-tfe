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
            ->where('organization_user.role', 'admin')
            ->orWhere('organization_user.role', 'owner')
            ->exists()
        ) {
            return Response::allow();
        }

        return Response::deny('Vous n\'avez pas les droits pour accéder à cet événement.');
    }

    public function settings(User $user, Organization $organization): Response
    {
        if ($user
            ->organizations()
            ->where('organizations.id', $organization->id)
            ->where('organization_user.role', 'admin')
            ->orWhere('organization_user.role', 'owner')
            ->exists()
        ) {
            return Response::allow();
        }

        return Response::deny('Vous n\'avez pas les droits pour accéder à cet événement.');
    }
}
