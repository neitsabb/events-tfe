import { useState, PropsWithChildren, ReactNode } from "react";

import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { cn } from "@/utils";
import { CustomerHeader } from "@/Components/Customer/CustomerHeader";

export default function CustomerLayout({ children }: PropsWithChildren) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#444444]">
            <CustomerHeader />
            <main className={"container !max-w-7xl"}>{children}</main>
        </div>
    );
}
