import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { MessageSquareWarningIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

export const AlertOrganizationStripe = () => {
    const { auth, permissions } = usePage<PageProps>().props;

    const { post, processing } = useForm();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        post(route('organizations.stripe.connect'));
    };
    return (
        auth.organizationLogged.stripe_status !== 'complete' && (
            <Alert className="z-10">
                <MessageSquareWarningIcon className="h-6 w-6 hidden md:block" />
                <AlertTitle>
                    Complétez votre organisation pour vendre des billets
                </AlertTitle>
                <AlertDescription>
                    Notre fournisseur de services de paiement a besoin des
                    détails de votre organisation pour que vous perceviez vos
                    revenus.
                </AlertDescription>
                <Button
                    onClick={handleClick}
                    variant={'ghost'}
                    className={
                        'underline underline-offset-4 -ml-2 md:ml-7 mt-2 md:mt-4 whitespace-nowrap text-sm font-medium text-primary/90 hover:text-primary flex gap-2 disabled:text-accent-foreground disabled:cursor-not-allowed'
                    }
                    disabled={processing || !permissions.organization.connect}
                >
                    {processing && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={'animate-spin w-4'}
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    )}
                    Compléter mon compte Stripe
                </Button>
            </Alert>
        )
    );
};
