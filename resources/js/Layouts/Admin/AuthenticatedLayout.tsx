import { useState, PropsWithChildren, ReactNode } from "react";

import { Link } from "@inertiajs/react";
import { Organization, User } from "@/types";
import { cn } from "@/utils";
import { ApplicationHeader } from "@/Components/Admin/ApplicationHeader";

export default function AuthenticatedLayout({
    auth,
    header,
    children,
    container = true,
}: PropsWithChildren<{
    auth: {
        user: User;
        organizationLogged: Organization;
        organizations: Organization[];
    };
    header?: ReactNode;
    container?: boolean;
}>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-white">
            <ApplicationHeader
                organizations={auth.organizations}
                organizationLogged={auth.organizationLogged}
            />
            <main className={container ? "container" : ""}>{children}</main>
        </div>
    );
}
