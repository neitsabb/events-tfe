import React, { PropsWithChildren } from 'react';
import AuthenticatedLayout from './AuthenticatedLayout';
import { SettingsLayout } from './SettingsLayout';
import { SidebarNavItem } from './EventSettingsLayout';

const organizationSidebarItems = [
    { title: 'Informations générales', panel: 'general' },
    { title: 'Membres', panel: 'team' },
];

export const OrganizationSettingsLayout: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const getOrganizationRoute = (item: SidebarNavItem) => {
        const panel =
            item.panel && item.panel !== 'general' ? `/${item.panel}` : '';
        return `/dashboard/organisations/settings${panel}`;
    };

    const isOrganizationActive = (item: SidebarNavItem) => {
        const pathSegments = window.location.pathname.split('/');
        const lastSegment = pathSegments.pop();

        // Si on est sur /settings sans panneau spécifique, c'est le panneau "general"
        if (lastSegment === 'settings' && item.panel === 'general') {
            return true;
        }

        // Comparaison pour les autres panneaux
        return lastSegment === item.panel;
    };

    return (
        <AuthenticatedLayout>
            {/* <AdminHeader
        title={"Paramètres de l'organisation"}
        className="border-b border-border"
      /> */}
            <SettingsLayout
                sidebarNavItems={organizationSidebarItems}
                getRoute={getOrganizationRoute}
                isActive={isOrganizationActive}
                title="Paramètres de l'organisation"
                description="Gérez les informations de votre organisation et les membres de votre équipe."
            >
                {children}
            </SettingsLayout>
        </AuthenticatedLayout>
    );
};
