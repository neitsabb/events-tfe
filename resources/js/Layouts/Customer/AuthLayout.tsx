export const AuthLayout = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="customer-theme font-integral bg-background flex w-screen h-screen justify-center items-center overflow-hidden relative px-6 md:px-0">
            <img
                src="/images/header-bg.png"
                alt="header"
                className="absolute top-0 right-0 -z-0"
            />
            <img
                src="/images/footer-bg.png"
                alt="header"
                className="absolute bottom-0 -left-48 -z-0 rotate-90"
            />
            <div className="max-w-2xl w-full mx-auto space-y-4 z-50">
                <div className="space-y-4">
                    <h2 className="text-xl text-center">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
};
