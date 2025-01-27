import { Error } from '@/Components/Customer/Error';
import { Input } from '@/Components/Customer/Input';
import { Button } from '@/Components/ui/button';
import { AuthLayout } from '@/Layouts/Customer/AuthLayout';
import { Link, useForm } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';

const View = () => {
    const emailSent = useRef(false);

    const [email, setEmail] = React.useState('');
    const { data, setData, post, errors, processing } = useForm({
        email: '',
    });

    useEffect(() => {
        setData({ email });
        console.log(data.email);
    }, [email]);

    const handleSubmit = () => {
        post(route('register.send'), {
            preserveState: true,
            onSuccess: () => (emailSent.current = true),
        });
    };

    return (
        <AuthLayout title="Pour commencer, entrez votre adresse e-mail.">
            <div className="bg-white px-4 py-6 mt-4 shadow flex flex-col gap-4">
                <Input
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Adresse e-mail"
                />
                {errors.email && <Error message={errors.email} />}
                {emailSent.current && (
                    <p className="text-green-300 text-xs flex gap-1 items-center justify-center">
                        Un code de vérification vous a été envoyé à l'adresse
                        e-mail fournie.
                    </p>
                )}
                <Button
                    variant="customer_primary"
                    onClick={handleSubmit}
                    disabled={processing}
                >
                    {processing && (
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    )}
                    Continuer avec l'adresse e-mail
                </Button>
            </div>

            <p className="text-sm flex gap-1 items-center justify-center flex-wrap">
                Vous avez déjà un compte organisateur ?
                <Link href={route('login')} className="text-primary underline">
                    Se connecter
                </Link>
            </p>
        </AuthLayout>
    );
};

export default View;
