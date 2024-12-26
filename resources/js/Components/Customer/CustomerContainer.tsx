import { cn } from '@/utils';
import React, { ReactNode } from 'react';

export const CustomerContainer = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn('container !max-w-7xl', className)}>{children}</div>
    );
};
