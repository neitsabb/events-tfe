import { buttonVariants } from "@/Components/ui/button";
import { cn } from "@/utils";
import { Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { CustomerAuthForm } from "./Form";

const View = () => {
    return (
        <div className="fixed inset-0 flex flex-col lg:flex-row items-center ">
            <div className=" w-full h-full flex flex-col items-center justify-center">
                <div className="max-w-sm md:max-w-lg  w-full">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "absolute left-4 top-4 md:left-8 md:top-8"
                        )}
                    >
                        <>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </>
                    </Link>
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            {/* <Logo className="mx-auto h-6 w-6" /> */}
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welcome back
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email to sign in to your account
                            </p>
                        </div>
                        <CustomerAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <Link
                                href="/register"
                                className="hover:text-brand underline underline-offset-4"
                            >
                                Don&apos;t have an account? Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;
