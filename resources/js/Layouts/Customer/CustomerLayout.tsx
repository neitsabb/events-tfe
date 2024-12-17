import { PropsWithChildren } from 'react';

import { CustomerHeader } from '@/Components/Customer/CustomerHeader';
import { cn } from '@/utils';

export default function CustomerLayout({ children }: PropsWithChildren) {
    return (
        <div className={cn('min-h-screen bg-primary')}>
            <CustomerHeader />
            <main className={cn('z-50 relative dark')}>{children}</main>
        </div>
    );
}
