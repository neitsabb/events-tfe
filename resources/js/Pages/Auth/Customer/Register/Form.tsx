"use client";

import * as React from "react";

import { cn } from "@/utils";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Loader } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CustomerRegisterForm({
    className,
    ...props
}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                placeholder="name@example.com"
                                type="name"
                                autoCapitalize="none"
                                autoComplete="name"
                                autoCorrect="off"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="firstname">Prénom</Label>
                            <Input
                                id="firstname"
                                placeholder="name@example.com"
                                type="firstname"
                                autoCapitalize="none"
                                autoComplete="firstname"
                                autoCorrect="off"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            placeholder="********"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password_confirmation">
                            Confirmation du mot de passe
                        </Label>
                        <Input
                            id="password_confirmation"
                            placeholder="********"
                            type="password_confirmation"
                            autoCapitalize="none"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        disabled={isLoading || email === "" || password === ""}
                    >
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        S'inscrire
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Ou inscrivez-vous avec
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button>
        </div>
    );
}
