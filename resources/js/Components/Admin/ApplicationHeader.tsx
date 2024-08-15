import { cn } from "@/utils";
import { Link } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

import { usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { Organization } from "@/types";

const nav = [
    {
        name: "Tableau de bord",
        href: "/dashboard",
    },
    // {
    //     name: "Événements",
    //     href: "/dashboard/events",
    // },
    {
        name: "Clients",
        href: "/dashboard/customers",
    },
    {
        name: "Paramètres",
        href: "/dashboard/settings",
    },
];

export const ApplicationHeader = ({
    organizations,
    organizationLogged,
}: {
    organizations: Organization[];
    organizationLogged: Organization;
}) => {
    const { url, component } = usePage();

    console.log(organizationLogged);
    return (
        <header className="border-b border-border ">
            <div className="container h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {/* <ApplicationLogo className="w-8" /> */}
                    <OrganizationSwitcher
                        organizations={organizations}
                        organizationLogged={organizationLogged}
                    />
                    <nav className="shrink-0">
                        <ul className="flex items-center gap-6">
                            {nav.map((item, i) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        as="a"
                                        className={cn(
                                            "text-sm font-medium",
                                            url === item.href
                                                ? "text-primary"
                                                : "text-primary/50"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center justify-between gap-6">
                    <Input placeholder="Rechercher" className="w-72" />
                    <Avatar className="w-9 h-9 aspect-square shrink-0">
                        <AvatarImage src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
                        <AvatarFallback>
                            <span>JD</span>
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
};
