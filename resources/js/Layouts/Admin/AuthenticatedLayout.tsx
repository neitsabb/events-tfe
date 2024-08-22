import { PropsWithChildren } from 'react';

import { ApplicationHeader } from '@/Components/Admin/ApplicationHeader';
import { Organization, User } from '@/types';

export default function AuthenticatedLayout({
  auth,
  children,
  container = true,
}: PropsWithChildren<{
  auth: {
    user: User;
    organizationLogged: Organization;
    organizations: Organization[];
  };
  container?: boolean;
}>) {
  return (
    <div className="min-h-screen bg-white">
      <ApplicationHeader
        organizations={auth.organizations}
        organizationLogged={auth.organizationLogged}
      />
      <main className={container ? 'container' : ''}>{children}</main>
    </div>
  );
}
