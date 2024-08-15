import { AdminHeader } from "@/Components/Admin/AdminHeader";
import { Configure } from "@/Components/Admin/Configure/Configure";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Event, Organization, User } from "@/types";
import { cn } from "@/utils";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";

const nav = [
    {
        title: "Vue d'ensemble",
        panel: "overview",
    },

    {
        title: "Ventes",
        panel: "sales",
    },
    {
        title: "Billets",
        panel: "tickets",
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
        title: "Paramètres",
        panel: "settings",
    },
];

export default function EventSingleLayout({
    auth,
    event,
    children,
}: PropsWithChildren<{
    auth: {
        user: User;
        organizationLogged: Organization;
        organizations: Organization[];
    };
    event: Event;
}>) {
    return (
        <AuthenticatedLayout auth={auth} container={false}>
            <AdminHeader
                className="border-b border-border"
                title={event.name}
                actions={
                    <>
                        <Button>Tester la billetterie</Button>
                        <TooltipProvider delayDuration={0.2}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        <Switch id="publish" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Publier votre billetterie</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                }
            />
            <Configure event={event} />
            <nav className="bg-accent text-accent-foreground/60 border-b border-border">
                <div className="container flex justify-between items-center h-14">
                    <ul className="flex space-x-6">
                        {nav.map((item, i) => (
                            <li key={i}>
                                <Link
                                    as="button"
                                    href={
                                        item.panel === "#"
                                            ? "#"
                                            : route("events.show", {
                                                  id: event.id,
                                                  panel:
                                                      item.panel !== "overview"
                                                          ? item.panel
                                                          : "",
                                              })
                                    }
                                    disabled={item.panel === "#"}
                                    className={cn(
                                        "text-sm font-medium disabled:cursor-not-allowed",
                                        {
                                            "text-primary":
                                                window.location.pathname
                                                    .split("/")
                                                    .pop() ===
                                                (event.id as unknown as string)
                                                    ? item.panel === "overview"
                                                    : item.panel ===
                                                      window.location?.pathname
                                                          .split("/")
                                                          .pop(),
                                        }
                                    )}
                                >
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <div className="container py-3.5 lg:py-12 relative">{children}</div>
        </AuthenticatedLayout>
    );
}
