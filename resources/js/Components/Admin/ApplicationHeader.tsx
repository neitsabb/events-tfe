import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { cn } from '@/utils';
import { Link, router } from '@inertiajs/react';

import { PageProps, PermissionsProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const nav = [
    {
        name: 'Événements',
        href: '/dashboard',
    },
    {
        name: 'Paramètres',
        href: '/dashboard/organisations/settings',
    },
];

type ApplicationHeaderProps = {
    permissions: PermissionsProps;
};
export const ApplicationHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {
        url,
        props: { permissions, auth },
    } = usePage<PageProps<ApplicationHeaderProps>>();

    console.log(url);
    return (
        <header className="border-b border-border">
            <div className="container h-16 flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-6">
                    {/* <ApplicationLogo className="w-8" /> */}
                    <OrganizationSwitcher />
                    {/* Navigation (Desktop) */}
                    <nav className="shrink-0 hidden md:block">
                        <ul className="flex items-center gap-6">
                            {nav.map((item) => {
                                // Vérifie si on est sur une page ou sous-page d'événements
                                const isEventsPage =
                                    url.startsWith('/dashboard/events') &&
                                    item.href === '/dashboard/events';

                                // Vérifie si l'élément est actif avec une correspondance stricte ou en tant que sous-chemin
                                const isExactMatch = url === item.href;
                                const isSubPath =
                                    url.startsWith(item.href) &&
                                    item.href !== '/dashboard';

                                // Combine les conditions pour définir si l'item est actif
                                const isActive =
                                    isExactMatch || isSubPath || isEventsPage;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            as="button"
                                            className={cn(
                                                'text-sm font-medium disabled:cursor-not-allowed',
                                                isActive
                                                    ? 'text-primary'
                                                    : 'text-primary/50'
                                            )}
                                            disabled={
                                                item.href ===
                                                    '/dashboard/organisations/settings' &&
                                                !permissions.organization
                                                    .settings
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                    {/* Menu Hamburger */}
                    <button
                        className="block md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {/* Icône Hamburger */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>

                    {/* Avatar */}
                    <AvatarDropdown className="hidden md:block" />
                </div>
            </div>
            {/* Mobile Navigation */}
            <div
                className={cn(
                    'bg-black/50 fixed inset-0 md:hidden transition-all z-20',
                    {
                        hidden: !isMenuOpen,
                    }
                )}
            ></div>
            <div
                className={cn(
                    'fixed top-0 right-0 bottom-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-20 ',
                    {
                        'translate-x-0': isMenuOpen,
                        'translate-x-full': !isMenuOpen,
                    }
                )}
            >
                <div className="p-6">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-500 hover:text-gray-700 mb-4"
                        aria-label="Close Menu"
                    >
                        {/* Icône Fermer */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                    <ul className="flex flex-col gap-3 mb-5 border-b border-border pb-5">
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
                                        !permissions.organization.settings
                                    }
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <AvatarDropdown className="float-right" />
                </div>
            </div>
        </header>
    );
};

const AvatarDropdown = ({ className }: { className?: string }) => {
    const { auth } = usePage<PageProps>().props;

    const onClick = (url: string) => {
        router.get(url);
    };
    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="none">
                        <AvatarHeader />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44" align="end">
                    <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={() => onClick(route('customer.home'))}
                        >
                            Retour au site
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onClick(route('logout'))}
                        >
                            Déconnexion
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

const AvatarHeader = ({ className }: { className?: string }) => {
    return (
        <Avatar
            className={cn(
                'w-9 h-9 aspect-square ring-1 ring-border ring-offset-2 shrink-0',
                className
            )}
        >
            <AvatarImage src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
            <AvatarFallback>
                <span>JD</span>
            </AvatarFallback>
        </Avatar>
    );
};
