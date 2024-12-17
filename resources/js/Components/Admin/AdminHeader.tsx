import React from 'react';
import { Title } from './Title';
import { cn } from '@/utils';

export const AdminHeader = ({
    title,
    actions,
    className,
    ...props
}: {
    title: string;
    actions?: React.ReactNode;
    className?: string;
}) => {
    return (
        <header
            className={cn('flex items-center justify-between py-10', className)}
            {...props}
        >
            <div className="flex items-center justify-between container">
                <Title title={title} level="h1" />
                <div className="flex items-center gap-6">{actions}</div>
            </div>
        </header>
    );
};
