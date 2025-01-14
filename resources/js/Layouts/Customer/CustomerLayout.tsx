import { PropsWithChildren } from 'react';

import { CustomerHeader } from '@/Components/Customer/CustomerHeader';
import { cn } from '@/utils';
import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Link } from '@inertiajs/react';

export default function CustomerLayout({
    children,
    isHome = false,
    background = false,
}: PropsWithChildren<{
    isHome?: boolean;
    background?: boolean;
}>) {
    return (
        <div
            className={cn(
                'customer-theme min-h-screen bg-background font-integral',
                background ? 'bg-primary' : 'bg-background'
            )}
        >
            <CustomerHeader isHome={isHome} background={background} />
            <main>{children}</main>
            <footer className="h-[333px] bg-primary text-white py-10 relative z-0">
                <CustomerContainer className="flex flex-col items-start justify-between h-full">
                    <img src="/images/logo.svg" alt="Eventura" />
                    <nav className="mt-auto">
                        <ul className="cursor-pointer flex flex-col uppercase text-sm font-medium">
                            <li className="hover:-translate-y-[2px] transition-transform">
                                <Link href="#">EVENEMENTS</Link>
                            </li>

                            <li className="hover:-translate-y-[2px] transition-transform">
                                MON COMPTE
                            </li>
                            <li className="hover:-translate-y-[2px] transition-transform">
                                PARTENAIRES
                            </li>
                            <li className="hover:-translate-y-[2px] transition-transform">
                                MENTIONS LEGALES
                            </li>
                            <li className="hover:-translate-y-[2px] transition-transform">
                                COOKIES
                            </li>
                        </ul>
                    </nav>
                    <img
                        src="/images/footer-bg.png"
                        alt="footer"
                        className="absolute right-0 bottom-0 z-50"
                    />
                </CustomerContainer>
            </footer>
        </div>
    );
}
