import { ChevronDownIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { CustomerContainer } from './CustomerContainer';
import { cn } from '@/utils';
import { Menu, MoveUpRightIcon, XIcon } from 'lucide-react';
import { PageProps } from '@/types';

export const CustomerHeader = ({
    isHome,
    background,
}: {
    isHome?: boolean;
    background: boolean;
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header
                className={cn(
                    'z-10  w-full flex h-24 items-center justify-between text-white',
                    isHome
                        ? 'absolute top-0 left-0'
                        : 'bg-transparent text-black'
                )}
            >
                {!isHome && (
                    <img
                        src="/images/header-bg.png"
                        alt="header"
                        className="absolute top-0 right-0 -z-0"
                    />
                )}
                <CustomerContainer className="flex items-center justify-between z-50">
                    <div
                        className={cn(
                            'flex items-center gap-16',
                            background || isHome ? 'text-white' : 'text-black'
                        )}
                    >
                        <Link href="/">
                            <h1 className="text-2xl font-bold">EVENTURA</h1>
                        </Link>
                        <nav className="hidden lg:flex">
                            <ul
                                className={cn(
                                    'flex items-center gap-6 uppercase text-sm font-medium'
                                )}
                            >
                                <li className="hover:-translate-y-[2px] transition-transform">
                                    <Link href="/events">
                                        Découvrir les événements
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:gap-8">
                        <Link
                            href={route('dashboard')}
                            className={cn(
                                'text-sm underline decoration-2 underline-offset-4 flex items-center text-muted transition-colors',
                                isHome ? 'hover:text-white' : 'hover:text-black'
                            )}
                        >
                            Je suis un organisateur
                            <MoveUpRightIcon
                                size={16}
                                strokeWidth={3}
                                className="ml-2"
                            />
                        </Link>

                        <Link href={route('customer.me.profile')}>
                            <Button
                                variant={
                                    isHome ? 'customer_blue' : 'customer_yellow'
                                }
                            >
                                MON COMPTE{' '}
                            </Button>
                        </Link>
                    </div>
                    <Button
                        variant={'customer_yellow'}
                        className="aspect-square rounded-full !px-0 lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu strokeWidth={2} />
                    </Button>
                </CustomerContainer>
            </header>
            <div
                className={cn(
                    'lg:hidden text-black fixed top-0 left-0 bottom-0 w-full bg-primary bg-opacity-90 z-50 transition-transform transform duration-300 px-4',
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <Link href="/" className="absolute top-8 left-4">
                    <h1 className="text-2xl font-bold text-white">EVENTURA</h1>
                </Link>
                <Button
                    variant={'none'}
                    className="aspect-square rounded-full !px-0 lg:hidden absolute right-4 top-7 text-white hover:text-accent"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <XIcon strokeWidth={2} />
                </Button>
                <ul className="flex flex-col justify-center mt-24 font-integral font-semibold text-xl gap-6 text-white [&>*]:transition-colors [&>*]:duration-300 ">
                    <li className="hover:text-secondary leading-6">
                        <Link href="/events">découvrir les événements</Link>
                    </li>

                    <li className="hover:text-secondary leading-6">
                        <Link href={route('dashboard')}>
                            je suis un organisateur
                        </Link>
                    </li>
                    <li className="hover:text-secondary leading-6">
                        <Link href="/me">Mon compte</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};
