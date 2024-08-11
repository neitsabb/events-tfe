import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export const CustomerHeader = () => {
    return (
        <header className="dark flex h-16 items-center justify-between text-white !bg-[#222121]">
            <div className="container !max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/">
                        <h1 className="font-black text-xl opacity-85 hover:opacity-100 transition-all">
                            EVENTURA
                        </h1>
                    </Link>
                    <Button
                        size={"icon"}
                        className="rounded-full bg-primary/10 text-white hover:bg-primary/5"
                    >
                        <MagnifyingGlassIcon />
                    </Button>
                    <nav>
                        <ul className="flex items-center gap-6 uppercase text-sm font-medium ">
                            <li className="hover:-translate-y-[2px] transition-transform ">
                                <Link href="#">Festival</Link>
                            </li>
                            <li className="hover:-translate-y-[2px] transition-transform ">
                                <Link href="#">Concerts</Link>
                            </li>
                            <li>
                                <button className="flex items-center gap-2 uppercase">
                                    Explorer par <ChevronDownIcon />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-8">
                    <Link href="#">
                        <Button variant="ghost" className="text-xs">
                            JE SUIS UN ORGANISATEUR
                        </Button>
                    </Link>
                    <Link href="#">
                        <Button variant={"customer"} className="text-xs">
                            CONNEXION / INSCRIPTION
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};
