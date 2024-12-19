import { cn } from '@/utils';
import { Link, usePage } from '@inertiajs/react';
import { buttonVariants } from '../ui/button';

interface SidebarNavItem {
    subpanel?: string; // Optionnel pour l'organisation
    title: string;
}

interface SidebarSettingsProps extends React.HTMLAttributes<HTMLElement> {
    items: SidebarNavItem[];
    getRoute: (item: SidebarNavItem) => string; // Fonction pour générer l'URL
    isActive?: (item: SidebarNavItem) => boolean; // Fonction pour déterminer si l'élément est actif
}

export const SidebarSettings: React.FC<SidebarSettingsProps> = ({
    className,
    items,
    getRoute,
    isActive,
    ...props
}) => {
    const defaultIsActive = (item: SidebarNavItem) => {
        const pathSegments = window.location.pathname.split('/');
        const lastSegment = pathSegments.pop();

        // Cas où le segment final est 'settings' (pas de subpanel dans l'URL)
        if (item.subpanel === 'general') {
            return lastSegment === 'settings';
        }

        // Comparaison normale pour les autres subpanels
        return lastSegment === item.subpanel;
    };

    return (
        <nav
            className={cn(
                'flex space-x-2 overflow-x-auto md:flex-col md:space-x-0 md:space-y-1 mb-4 md:mb-0',
                className
            )}
            {...props}
        >
            {items.map((item) => {
                const active = isActive
                    ? isActive(item)
                    : defaultIsActive(item);

                return (
                    <Link
                        key={item.subpanel || item.title}
                        href={getRoute(item)}
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            {
                                'bg-muted hover:bg-muted': active,
                                'hover:bg-transparent hover:underline': !active,
                            },
                            'justify-start'
                        )}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
};
