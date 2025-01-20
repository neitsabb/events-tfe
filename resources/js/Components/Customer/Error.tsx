import { cn } from '@/utils';

export const Error = ({
    message,
    className,
}: {
    message: string;
    className?: string;
}) => <div className={cn('text-xs text-red-400', className)}>{message}</div>;
