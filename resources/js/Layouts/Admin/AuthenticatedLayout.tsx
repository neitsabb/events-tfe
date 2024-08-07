import { useState, PropsWithChildren, ReactNode } from "react";

import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { cn } from "@/utils";
import { ApplicationHeader } from "@/Components/Admin/ApplicationHeader";

export default function Authenticated({
    user,
    header,
    children,
    container = true,
}: PropsWithChildren<{ user: User; header?: ReactNode; container?: boolean }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-white">
            <ApplicationHeader />
            <main className={container ? "container" : ""}>{children}</main>
        </div>
    );
}
