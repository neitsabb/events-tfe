import { Event } from '@/types';
import React, { PropsWithChildren } from 'react';
import EventSingleLayout from './EventSingleLayout';
import { SettingsLayout } from './SettingsLayout';
import { Head } from '@inertiajs/react';

interface EventSettingsLayoutProps {
    event: Event;
}

const eventSidebarItems = [
    { title: 'Paramètres généraux', subpanel: 'general' },
    { title: 'Préférences', subpanel: 'preferences' },
    { title: 'Zone de danger', subpanel: 'advanced' },
];

export interface SidebarNavItem {
    subpanel?: string; // Optionnel pour l'organisation
    panel?: string;
    title: string;
}

export const EventSettingsLayout: React.FC<
    PropsWithChildren<EventSettingsLayoutProps>
> = ({ event, children }) => {
    const getEventRoute = (item: SidebarNavItem) => {
        const subpanelPath =
            item.subpanel && item.subpanel !== 'general'
                ? `/${item.subpanel}`
                : '';
        return `/dashboard/events/${event.id}/settings${subpanelPath}`;
    };

    return (
        <EventSingleLayout event={event}>
            <Head title={`Paramètres`} />

            <SettingsLayout
                title="Paramètres de l'événement"
                description="Gérez les paramètres de votre événement ici."
                sidebarNavItems={eventSidebarItems}
                getRoute={getEventRoute}
            >
                {children}
            </SettingsLayout>
        </EventSingleLayout>
    );
};
