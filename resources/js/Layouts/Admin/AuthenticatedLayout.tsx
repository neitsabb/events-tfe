import { PropsWithChildren } from 'react';

import { ApplicationHeader } from '@/Components/Admin/ApplicationHeader';
// import { PageBreadcrumb } from '@/Components/Admin/PageBreadcrumb';

interface AuthenticatedLayoutProps {
  container?: boolean;
}

const AuthenticatedLayout: React.FC<
  PropsWithChildren<AuthenticatedLayoutProps>
> = ({ children, container = true }) => {
  return (
    <div className="min-h-screen bg-white">
      <ApplicationHeader />
      {/* <PageBreadcrumb /> */}
      <main className={container ? 'container' : ''}>{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
