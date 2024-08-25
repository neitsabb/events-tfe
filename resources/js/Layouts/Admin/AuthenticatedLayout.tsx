import { PropsWithChildren } from 'react';

import { ApplicationHeader } from '@/Components/Admin/ApplicationHeader';
import { cn } from '@/utils';
// import { PageBreadcrumb } from '@/Components/Admin/PageBreadcrumb';

interface AuthenticatedLayoutProps {
    container?: boolean;
    className?: string;
}

const AuthenticatedLayout: React.FC<
    PropsWithChildren<AuthenticatedLayoutProps>
> = ({ children, container = true, className }) => {
    return (
        <div className="min-h-screen bg-white">
            <ApplicationHeader />
            {/* <PageBreadcrumb /> */}
            <main
                className={cn('pb-12', container ? 'container' : '', className)}
            >
                {children}
            </main>
        </div>
    );
};

export default AuthenticatedLayout;
