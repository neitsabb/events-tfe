import { PropsWithChildren, useEffect, useState } from 'react';

import { cn } from '@/utils';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

export default function CheckoutLayout({
    children,
    progress,
}: PropsWithChildren<{
    progress: number;
}>) {
    useEffect(() => {
        console.log('Progress:', progress);
    }, [progress]);
    return (
        <div
            className={cn(
                'customer-theme min-h-screen font-integral bg-background'
            )}
        >
            <header className="p-4 space-y-4">
                <h1 className="font-bold text-2xl">
                    Eventura.
                    <Link href={route('customer.home')}>
                        <Button variant={'link'} className="ml-4">
                            Annuler la commande
                        </Button>
                    </Link>
                </h1>
                <ProgressBar progress={progress} />
            </header>
            <main
                className={cn('z-50 relative max-w-2xl mx-auto py-16 h-full')}
            >
                {children}
            </main>
        </div>
    );
}

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="h-1 bg-gray-100 w-full">
            <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};
