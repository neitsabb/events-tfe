import { PropsWithChildren, useState } from "react";

import { CustomerHeader } from "@/Components/Customer/CustomerHeader";
import { cn } from "@/utils";

export default function CustomerLayout({
    children,
    bg = false,
}: PropsWithChildren<{ bg?: boolean }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className={cn("min-h-screen", bg && "bg-[#222121]")}>
            <CustomerHeader />
            <main className={cn("z-50 relative dark")}>{children}</main>
        </div>
    );
}
