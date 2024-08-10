import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/Components/ui/button";

export const CustomerHeader = () => {
    return (
        <header className="flex h-16 items-center justify-between text-white">
            <div className=" container flex items-center gap-8">
                <span>Logo</span>
                <Button size={"icon"} className="rounded-full opacity-50">
                    <MagnifyingGlassIcon />
                </Button>
                <nav>
                    <ul className="flex items-center gap-6 uppercase text-sm font-medium">
                        <li>Festival</li>
                        <li>Concerts</li>
                        <li>
                            <button className="flex items-center gap-2 uppercase">
                                Explorer par <ChevronDownIcon />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
