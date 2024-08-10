import { PropsWithChildren, useState } from "react";

import { CustomerHeader } from "@/Components/Customer/CustomerHeader";

export default function CustomerLayout({ children }: PropsWithChildren) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen ">
            <CustomerHeader />
            <main className={"z-50 relative dark"}>{children}</main>
        </div>
    );
}
