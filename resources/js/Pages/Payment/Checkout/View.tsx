import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import CheckoutLayout from '@/Layouts/Customer/CheckoutLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useMemo, useRef, useState } from 'react';

const View = () => {
    const { auth } = usePage<PageProps>().props;

    return (
        <CheckoutLayout>
            {auth?.user ? <CheckoutStep /> : <StepUser />}
        </CheckoutLayout>
    );
};

export default View;

const StepUser = () => {
    const { auth } = usePage<PageProps>().props;

    const [email, setEmail] = useState<string>('');

    const [emailStatus, setEmailStatus] = useState<
        'initial' | 'exists' | 'notExists'
    >('initial');

    const submitOnce = useRef(false);

    const handleCheckout = async () => {
        if (!auth?.user) {
            if (!submitOnce.current) {
                if (!email) return;

                try {
                    const response = await fetch(
                        route('check.email', {
                            email,
                        })
                    );
                    const userExists = await response.json();
                    submitOnce.current = true;
                    setEmailStatus(userExists ? 'exists' : 'notExists');
                } catch (e) {
                    setEmailStatus('initial');
                    console.error(e);
                }
            } else {
                if (emailStatus === 'exists') {
                    router.post(route('login'), {
                        email: loginData.email,
                        password: loginData.password,
                        redirect_to: route('checkout'),
                    });
                }
            }
        } else {
            console.log('continue to checkout');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setLoginData('email', e.target.value);
        setEmailStatus('initial');
        submitOnce.current = false;
    };

    const { data: registerData, setData: setRegisterData } = useForm({
        email,
        password: '',
        confirmEmail: '',
        confirmPassword: '',
    });

    const { data: loginData, setData: setLoginData } = useForm({
        email,
        password: '',
    });

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-wider leading-none">
                Où est-ce qu'on envoie tes billets ?
            </h2>
            <div>
                <p className="pb-2 text-secondary-foreground text-sm">
                    Entre ton e-mail pour te connecter ou créer un nouveau
                    compte
                </p>
                <Input
                    type="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={handleEmailChange}
                />

                {emailStatus === 'exists' && (
                    <Input
                        type="password"
                        placeholder="Mot de passe"
                        className="mt-2"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData('password', e.target.value)
                        }
                    />
                )}
                {emailStatus === 'notExists' && submitOnce.current && (
                    <>
                        <Input
                            type="email"
                            placeholder="Confirmation de l'email"
                            className="mt-2"
                            value={registerData.confirmEmail}
                            onChange={(e) =>
                                setRegisterData('confirmEmail', e.target.value)
                            }
                        />
                        <Input
                            type="password"
                            placeholder="Mot de passe"
                            className="mt-2"
                            value={registerData.password}
                            onChange={(e) =>
                                setRegisterData('password', e.target.value)
                            }
                        />
                        <Input
                            type="password"
                            placeholder="Confirmation du mot de passe"
                            className="mt-2"
                            value={registerData.confirmPassword}
                            onChange={(e) =>
                                setRegisterData(
                                    'confirmPassword',
                                    e.target.value
                                )
                            }
                        />
                    </>
                )}

                <Button
                    className="w-full mt-4 uppercase !font-semibold tracking-wider"
                    onClick={handleCheckout}
                >
                    Continuer la commande
                </Button>
            </div>
        </div>
    );
};

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './Partials/PaymentForm';
import { Admission, Extra, PageProps } from '@/types';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export type PaymentFormProps = {
    totalAmount: number;
    tickets: {
        admissions: Admission[];
        extras: Extra[];
    };
    paymentIntent: string;
};

const CheckoutStep = () => {
    const { paymentIntent, totalAmount, tickets } =
        usePage<PageProps<PaymentFormProps>>().props;

    const options = useMemo(() => {
        return {
            clientSecret: paymentIntent as string,
        };
    }, [paymentIntent]);
    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm
                totalAmount={totalAmount}
                tickets={tickets}
                paymentIntent={paymentIntent}
            />
        </Elements>
    );
};
