import { buttonVariants } from "@/Components/ui/button";
import { Event, PageProps, User } from "@/types";
import { cn } from "@/utils";
import React, { PropsWithChildren } from "react";
import EventSingleLayout from "./EventSingleLayout";
import { Separator } from "@/Components/ui/separator";
import { Link } from "@inertiajs/react";

const sidebarNavItems = [
    {
        title: "Paramètres généraux",
        subpanel: "general",
    },
    {
        title: "Préférences",
        subpanel: "preferences",
    },
    {
        title: "Zone de danger",
        subpanel: "advanced",
    },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        subpanel: string;
        title: string;
    }[];
    event: Event;
}

export const EventSettingsLayout = ({
    auth,
    event,
    children,
}: PropsWithChildren<
    PageProps & {
        event: Event;
    }
>) => {
    return (
        <EventSingleLayout auth={auth} event={event}>
            <div className="space-y-6 ">
                <div className="space-y-0.5">
                    <h2 className="text-xl font-bold tracking-tight">
                        Configuration
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Vous pouvez personnaliser les paramètres de votre
                        événement ici.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
                    <aside className="lg:w-1/5 !top-0">
                        <SidebarSettings
                            items={sidebarNavItems}
                            event={event}
                        />
                    </aside>
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </EventSingleLayout>
    );
};

const SidebarSettings = ({
    className,
    items,
    event,
    ...props
}: SidebarNavProps) => {
    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => {
                const location = window.location.pathname.split("/").pop();
                const isActive =
                    location !== "settings"
                        ? location === item.subpanel
                        : item.subpanel === "general";
                return (
                    <Link
                        key={item.subpanel}
                        href={route("events.show", {
                            id: event.id,
                            panel: "settings",
                            subpanel:
                                item.subpanel !== "general"
                                    ? item.subpanel
                                    : "",
                        })}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            {
                                "bg-muted hover:bg-muted": isActive,
                                "hover:bg-transparent hover:underline":
                                    !isActive,
                            },
                            "justify-start"
                        )}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
};
