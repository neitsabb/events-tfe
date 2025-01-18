import { FormSection } from '@/Components/Admin/FormSection';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { OrganizationSettingsLayout } from '@/Layouts/Admin/OrganizationSettingsLayout';
import { PageProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

export const View = () => {
    const { auth, required_actions } = usePage<PageProps>().props;

    const { post, processing } = useForm();

    const connectStripe = () => {
        post(route('organizations.stripe.connect'));
    };

    // useEffect(() => {
    //     fetch(route('organizations.stripe.verification'))
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }, []);

    console.log(required_actions);
    return (
        <OrganizationSettingsLayout>
            <FormSection
                title="Etat de votre compte Stripe"
                description="Pour recevoir des paiements, vous devez lier votre compte Stripe."
            >
                <div className="text-sm text-secondary-foreground">
                    {auth.organizationLogged.stripe_status === 'complete' ? (
                        required_actions ? (
                            'Vous avez lié votre compte Stripe, mais il reste des actions à effectuer.'
                        ) : (
                            'Votre compte Stripe est lié et prêt à recevoir des paiements.'
                        )
                    ) : (
                        <Button onClick={connectStripe} disabled={processing}>
                            Lier mon compte Stripe
                        </Button>
                    )}
                </div>
            </FormSection>
        </OrganizationSettingsLayout>
    );
};

export default View;
