import { PropsWithChildren } from 'react';

import { ApplicationHeader } from '@/Components/Admin/ApplicationHeader';

interface AuthenticatedLayoutProps {
  container?: boolean;
}

const AuthenticatedLayout: React.FC<
  PropsWithChildren<AuthenticatedLayoutProps>
> = ({ children, container = true }) => {
  return (
    <div className="min-h-screen bg-white">
      <ApplicationHeader />
      <main className={container ? 'container' : ''}>{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
