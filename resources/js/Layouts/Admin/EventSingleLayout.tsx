import { AdminHeader } from '@/Components/Admin/AdminHeader';
import { Configure } from '@/Components/Admin/Configure/Configure';
import { Button } from '@/Components/ui/button';
import { Event, PageProps, PermissionsProps } from '@/types';
import { cn } from '@/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import AuthenticatedLayout from './AuthenticatedLayout';
import { toast } from '@/Components/ui/use-toast';

const nav = [
    {
        title: "Vue d'ensemble",
        panel: 'overview',
    },

    {
        title: 'Transactions',
        panel: 'transactions',
    },
    {
        title: 'Billets',
        panel: 'tickets',
    },
    // {
    //     title: "Participants",
    //     panel: "#",
    // },
    // {
    //     title: "Invitations",
    //     panel: "#",
    // },
    // {
    //     title: "Offres",
    //     panel: "#",
    // },
    // {
    //     title: "Statistiques",
    //     panel: "#",
    // },
    {
        title: 'Paramètres',
        panel: 'settings',
    },
];

interface EventSingleLayoutProps {
    event: Event;
}

type PagePropsWithPermissions = {
    permissions: PermissionsProps;
};

const EventSingleLayout: React.FC<
    PropsWithChildren<EventSingleLayoutProps>
> = ({ event, children }) => {
    const {
        url,
        props: { permissions },
    } = usePage<PageProps<PagePropsWithPermissions>>();
    const handlePublish = () => {
        router.post(
            route('events.publish', { event: event.id }),
            {},
            {
                replace: true,
                onSuccess: ({ props: { flash } }) => {
                    toast({
                        title: 'Succès',
                        description: flash.success,
                    });
                },
                onError: (e) => {
                    toast({
                        title: 'Erreur',
                        description: e.error,
                    });
                },
            }
        );
    };

    const handlePreview = () => {
        router.get(route('events.preview', { event: event.id }));
    };
    return (
        <AuthenticatedLayout container={false}>
            <AdminHeader
                className="border-b border-border"
                title={event.name}
                actions={
                    <>
                        <Button onClick={handlePreview} variant="secondary">
                            Prévisualiser
                        </Button>
                        <Button onClick={handlePublish}>
                            {event.status === 'draft' ? 'Publier' : 'Dépublier'}
                        </Button>
                    </>
                }
            />
            <Configure event={event} />
            <nav className="bg-accent text-accent-foreground/60 border-b border-border">
                <div className="container flex justify-between items-center h-14">
                    <ul className="flex space-x-6 overflow-x-auto">
                        {nav.map((item, i) => {
                            const isActive =
                                window.location.pathname.split('/').pop() ===
                                (event.id as unknown as string)
                                    ? item.panel === 'overview'
                                    : item.panel ===
                                      window.location?.pathname
                                          .split('/')
                                          .pop();

                            return (
                                <li key={i}>
                                    <Link
                                        as="button"
                                        href={
                                            item.panel === '#'
                                                ? '#'
                                                : route('events.show', {
                                                      event: event.id,
                                                      panel:
                                                          item.panel !==
                                                          'overview'
                                                              ? item.panel
                                                              : '',
                                                  })
                                        }
                                        disabled={
                                            item.panel === 'settings' &&
                                            !permissions.event.settings
                                        }
                                        className={cn(
                                            'w-auto whitespace-nowrap text-sm font-medium disabled:cursor-not-allowed',
                                            {
                                                'text-primary': isActive,
                                            }
                                        )}
                                    >
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
            <div className="container relative">{children}</div>
        </AuthenticatedLayout>
    );
};

export default EventSingleLayout;
