import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import CheckoutLayout from '@/Layouts/Customer/CheckoutLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useMemo, useRef, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './Partials/PaymentForm';
import { Admission, Event, EventsProps, Extra, PageProps } from '@/types';
import { PreferenceComponents } from './Partials/PreferencesComponents';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export type PaymentFormProps = {
    totalAmount: number;
    tickets: {
        admissions: Admission[];
        extras: Extra[];
    };
    paymentIntent: string;
};

// Main View Component
const View = () => {
    const { auth, event } = usePage<PageProps<{ event: Event }>>().props;

    console.log(event);

    const [currentStep, setCurrentStep] = useState<'preferences' | 'payment'>(
        'preferences'
    );

    const handleContinue = () => {
        setCurrentStep('payment');
    };

    return (
        <CheckoutLayout>
            {auth?.user ? (
                currentStep === 'preferences' &&
                event.preferences.length > 0 ? (
                    <PreferencesStep onContinue={handleContinue} />
                ) : (
                    <CheckoutStep />
                )
            ) : (
                <StepUser />
            )}
        </CheckoutLayout>
    );
};

export default View;

type PreferencesStepProps = {
    onContinue: () => void;
};

type PreferencesFormData = {
    legal_age: string;
    email: string;
    phone: string;
    birth: string;
};

// Component for PreferencesStep
const PreferencesStep = ({ onContinue }: PreferencesStepProps) => {
    const { setData, errors, post } = useForm<PreferencesFormData>({
        legal_age: '',
        email: '',
        phone: '',
        birth: '',
    });

    const { event } = usePage<
        PageProps<{
            event: Event;
        }>
    >().props;

    const handleInputChange = (key: string, value: string) => {
        setData(key, value);
    };

    const handleSubmit = () => {
        post(route('payment.checkout.preferences'), {
            preserveScroll: true,
            onSuccess: onContinue,
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-wider leading-none">
                Informations supplémentaires
            </h2>
            <div>
                {event.preferences.map((preference: any) => {
                    const Component = PreferenceComponents[preference.key];

                    return Component ? (
                        <div key={preference.key} className="mt-2">
                            <Component
                                value={preference.value}
                                onChange={handleInputChange}
                                errors={errors}
                            />
                        </div>
                    ) : (
                        <div key={preference.key}>
                            <p className="text-red-500">
                                Aucun composant pour la préférence{' '}
                                {preference.key}
                            </p>
                        </div>
                    );
                })}
            </div>
            <Button onClick={handleSubmit}>Continuer</Button>
        </div>
    );
};

// Component for StepUser
const StepUser = () => {
    const { auth } = usePage<PageProps>().props;

    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState<
        'initial' | 'exists' | 'notExists'
    >('initial');
    const submitOnce = useRef(false);

    const { data: registerData, setData: setRegisterData } = useForm({
        email: '',
        password: '',
        confirmEmail: '',
        confirmPassword: '',
    });

    const { data: loginData, setData: setLoginData } = useForm({
        email: '',
        password: '',
    });

    // Handle email input change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setLoginData('email', emailValue);
        setEmailStatus('initial');
        submitOnce.current = false;
    };

    // Handle the checkout process
    const handleCheckout = async () => {
        if (!auth?.user) {
            if (!submitOnce.current) {
                if (!email) return;

                try {
                    const response = await fetch(
                        route('check.email', { email })
                    );
                    const userExists = await response.json();
                    submitOnce.current = true;
                    setEmailStatus(userExists ? 'exists' : 'notExists');
                } catch (error) {
                    setEmailStatus('initial');
                    console.error('Error checking email:', error);
                }
            } else {
                if (emailStatus === 'exists') {
                    router.post(route('customer.auth.signin'), {
                        email: loginData.email,
                        password: loginData.password,
                        redirect_to: route('checkout'),
                    });
                }
            }
        } else {
            console.log('User authenticated, proceeding to checkout');
        }
    };

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

// Component for CheckoutStep
const CheckoutStep = () => {
    const { paymentIntent, totalAmount, tickets } =
        usePage<PageProps<PaymentFormProps>>().props;

    const options = useMemo(
        () => ({
            clientSecret: paymentIntent,
        }),
        [paymentIntent]
    );

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
