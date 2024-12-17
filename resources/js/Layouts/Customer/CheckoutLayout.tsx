import { PropsWithChildren } from 'react';

import { cn } from '@/utils';

export default function CheckoutLayout({ children }: PropsWithChildren) {
    return (
        <div className={cn('min-h-screen')}>
            <header className="p-4 border-b">
                <h1 className="font-bold text-2xl">Eventura.</h1>
            </header>
            <main className={cn('z-50 relative max-w-xl mx-auto py-8')}>
                {children}
            </main>
        </div>
    );
}
