import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Input } from '@/Components/ui/input';
import { cn } from '@/utils';
import { Link } from '@inertiajs/react';

import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { useState } from 'react';

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

export const ApplicationHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { url, props } = usePage<PageProps>();

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
                    <AvatarHeader className="hidden md:block" />
                </div>
            </div>
            {/* Mobile Navigation */}
            <div
                className={cn(
                    'bg-black/50 fixed inset-0 md:hidden transition-all',
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
                                        !props.permissions.organization.settings
                                    }
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <AvatarHeader />
                </div>
            </div>
        </header>
    );
};

const AvatarHeader = ({ className }: { className?: string }) => {
    return (
        <Avatar className={cn('w-9 h-9 aspect-square shrink-0', className)}>
            <AvatarImage src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
            <AvatarFallback>
                <span>JD</span>
            </AvatarFallback>
        </Avatar>
    );
};
