"use client";

import * as React from "react";

import { cn } from "@/utils";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Loader } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useForm } from "@inertiajs/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CustomerLoginForm({ className, ...props }: UserAuthFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={submit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Adresse e-mail
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            value={data.email}
                            onChange={(event) =>
                                setData("email", event.target.value)
                            }
                            disabled={processing}
                        />
                        {errors?.email && (
                            <p className="text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div
                        className={cn(
                            "transition-all duration-300 ease-in-out overflow-hidden",
                            data.email !== ""
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0"
                        )}
                    >
                        <Label className="sr-only" htmlFor="password">
                            Mot de passe
                        </Label>
                        <Input
                            id="password"
                            placeholder="********"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            value={data.password}
                            onChange={(event) =>
                                setData("password", event.target.value)
                            }
                            disabled={processing}
                        />
                        <p className="text-sm text-red-600">
                            {errors.password}
                        </p>
                    </div>
                    <Button
                        disabled={
                            processing ||
                            data.email === "" ||
                            data.password === ""
                        }
                    >
                        {processing && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Se connecter
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Ou connectez-vous avec
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={processing}>
                {processing ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button>
        </div>
    );
}
