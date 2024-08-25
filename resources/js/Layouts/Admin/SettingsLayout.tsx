import { SidebarSettings } from '@/Components/Admin/SidebarSettings';
import { Separator } from '@/Components/ui/separator';
import React, { PropsWithChildren } from 'react';

interface SettingsLayoutProps {
  title?: string;
  description?: string;
  sidebarNavItems: any[];
  getRoute: (item: any) => string;
  isActive?: (item: any) => boolean;
}

export const SettingsLayout: React.FC<
  PropsWithChildren<SettingsLayoutProps>
> = ({ title, description, sidebarNavItems, getRoute, isActive, children }) => {
  return (
    <div className="space-y-8">
      {title && description ? (
        <>
          <div className="space-y-0.5 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <Separator className="my-6" />
        </>
      ) : null}
      <div className="flex flex-col lg:flex-row lg:space-x-6 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarSettings
            items={sidebarNavItems}
            getRoute={getRoute}
            isActive={isActive}
          />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};
