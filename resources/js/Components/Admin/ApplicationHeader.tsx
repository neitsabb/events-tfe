import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Input } from '@/Components/ui/input';
import { cn } from '@/utils';
import { Link } from '@inertiajs/react';

import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { OrganizationSwitcher } from './OrganizationSwitcher';

const nav = [
    {
        name: "Vue d'ensemble",
        href: '/dashboard',
    },
    {
        name: 'Événements',
        href: '/dashboard/events',
    },
    {
        name: 'Clients',
        href: '/dashboard/customers',
    },
    {
        name: 'Paramètres',
        href: '/dashboard/organisations/settings',
    },
];

export const ApplicationHeader = () => {
    const { url, props } = usePage<PageProps>();

    return (
        <header className="border-b border-border ">
            <div className="container h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {/* <ApplicationLogo className="w-8" /> */}
                    <OrganizationSwitcher
                        organizations={props.auth.organizations}
                        organizationLogged={props.auth.organizationLogged}
                    />
                    <nav className="shrink-0">
                        <ul className="flex items-center gap-6">
                            {nav.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        as="button"
                                        className={cn(
                                            'text-sm font-medium disabled:cursor-not-allowed',
                                            url === item.href
                                                ? 'text-primary'
                                                : 'text-primary/50'
                                        )}
                                        disabled={
                                            item.href ===
                                                '/dashboard/organisations/settings' &&
                                            !props.permissions.organization
                                                .settings
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center justify-between gap-6">
                    <Input placeholder="Rechercher" className="w-72" />
                    <Avatar className="w-9 h-9 aspect-square shrink-0">
                        <AvatarImage src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
                        <AvatarFallback>
                            <span>JD</span>
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
};
