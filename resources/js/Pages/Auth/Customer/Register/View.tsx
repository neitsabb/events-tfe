import { buttonVariants } from "@/Components/ui/button";
import { cn } from "@/utils";
import { Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { CustomerRegisterForm } from "./Form";
import { CustomerLoginForm } from "../Login/Form";

const View = () => {
    return (
        <div className="fixed inset-0 flex flex-col lg:flex-row items-center ">
            <div className=" w-full h-full flex flex-row items-center">
                <div className="hidden lg:block w-1/2 h-full bg-primary bg-opacity-10"></div>
                <h1 className="text-xl font-bold absolute top-6 left-6 text-primary-foreground">
                    Eventura.
                </h1>
                <p className="max-w-[336px] text-sm font-light absolute left-6 bottom-8 text-primary-foreground">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi velit fugit qui magnam repellendus illo reprehenderit.
                </p>
                <div className="relative h-full w-full flex flex-col justify-center items-center">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "absolute left-4 top-4 md:left-8 md:top-8"
                        )}
                    >
                        <>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Retour
                        </>
                    </Link>
                    <div className="mx-auto px-6 md:px-0 max-w-xs md:max-w-lg flex w-full flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            {/* <Logo className="mx-auto h-6 w-6" /> */}
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Créer un compte
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Entrez vos informations pour vous inscrire.
                            </p>
                        </div>
                        <CustomerRegisterForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <span className="hover:text-brand">
                                Vous avez déjà un compte ?{" "}
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4"
                                >
                                    Connectez-vous
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;
