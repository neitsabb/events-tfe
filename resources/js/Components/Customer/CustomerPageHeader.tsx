import React, { PropsWithChildren } from "react";

export const CustomerPageHeader = ({ children }: PropsWithChildren) => {
    return (
        <header className="pt-8">
            <h2 className="text-3xl font-black uppercase tracking-wider text-white">
                {children}
            </h2>
        </header>
    );
};
