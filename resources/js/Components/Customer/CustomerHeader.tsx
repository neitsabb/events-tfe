import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { CustomerContainer } from './CustomerContainer';
import { cn } from '@/utils';
import { MoveUpRightIcon } from 'lucide-react';
import { PageProps } from '@/types';

export const CustomerHeader = ({
    isHome,
    background,
}: {
    isHome?: boolean;
    background: boolean;
}) => {
    const { auth } = usePage<PageProps>().props;

    return (
        <header
            className={cn(
                'z-10  w-full flex h-24 items-center justify-between text-white',
                isHome ? 'absolute top-0 left-0' : 'bg-transparent text-black'
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
                    <nav>
                        <ul
                            className={cn(
                                'flex items-center gap-6 uppercase text-sm font-medium'
                            )}
                        >
                            <li className="hover:-translate-y-[2px] transition-transform">
                                <Link href="/events">EVENEMENTS</Link>
                            </li>

                            <li className="hover:-translate-y-[2px] transition-transform">
                                <button className="flex items-center gap-2 uppercase">
                                    Explorer par <ChevronDownIcon />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-8">
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

                    <Link href="/me">
                        <Button
                            variant={
                                isHome ? 'customer_blue' : 'customer_yellow'
                            }
                        >
                            MON COMPTE{' '}
                        </Button>
                    </Link>
                </div>
            </CustomerContainer>
        </header>
    );
};
