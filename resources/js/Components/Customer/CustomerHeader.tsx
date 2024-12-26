import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { CustomerContainer } from './CustomerContainer';
import { cn } from '@/utils';

export const CustomerHeader = ({
    isHome,
    background,
}: {
    isHome?: boolean;
    background: boolean;
}) => {
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
                                <Link href="#">EVENEMENTS</Link>
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
                    <Link href="/login">
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
