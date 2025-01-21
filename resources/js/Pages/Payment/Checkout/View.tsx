import { Button } from '@/Components/ui/button';
import CheckoutLayout from '@/Layouts/Customer/CheckoutLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './Partials/PaymentForm';
import { Admission, Event, Extra, PageProps } from '@/types';
import {
    PreferenceComponents,
    ValueTypes,
} from './Partials/PreferencesComponents';
import { Input } from '@/Components/Customer/Input';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export type PaymentFormProps = {
    totalAmount: number;
    tickets: {
        admissions: Admission[];
        extras: Extra[];
    };
    paymentIntent: string;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
};

// Main View Component
const View = () => {
    const { auth, event } = usePage<PageProps<{ event: Event }>>().props;

    const [progress, setProgress] = useState(0);

    const [currentStep, setCurrentStep] = useState<'preferences' | 'payment'>(
        'preferences'
    );

    const handleContinue = () => {
        setCurrentStep('payment');
    };

    return (
        <CheckoutLayout progress={progress}>
            <Head title="Checkout" />

            {auth?.user ? (
                currentStep === 'preferences' &&
                event.preferences.length > 0 ? (
                    <PreferencesStep
                        onContinue={handleContinue}
                        setProgress={setProgress}
                    />
                ) : (
                    <CheckoutStep setProgress={setProgress} />
                )
            ) : (
                <StepUser setProgress={setProgress} />
            )}
        </CheckoutLayout>
    );
};

export default View;

type PreferencesStepProps = {
    onContinue: () => void;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
};

type PreferencesFormData = {
    legal_age: string;
    email: string;
    phone: string;
    birth: string;
};

// Component for PreferencesStep
const PreferencesStep = ({ onContinue, setProgress }: PreferencesStepProps) => {
    useEffect(() => {
        setProgress(25);
    }, []);
    const { data, setData, errors, post } = useForm<PreferencesFormData>({
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

    const handleInputChange = (field: string, value: ValueTypes) => {
        setData(field as keyof PreferencesFormData, value as string);
    };

    useEffect(() => {
        console.log('Data:', data);
    }, [data]);

    const handleSubmit = () => {
        console.log('Submitting preferences:', data);
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
                    if (preference.value === '') return;
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
            <Button onClick={handleSubmit} variant={'customer_primary'}>
                Continuer
            </Button>
        </div>
    );
};

const StepUser = ({
    setProgress,
}: {
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { auth } = usePage<PageProps>().props;

    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState<
        'initial' | 'exists' | 'notExists'
    >('initial');
    const submitOnce = useRef(false);
    // Array of object key string error string
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { data: registerData, setData: setRegisterData } = useForm({
        email: email,
        password: '',
        confirmEmail: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        birthday: '',
    });

    const { data: loginData, setData: setLoginData } = useForm({
        email: '',
        password: '',
    });

    // Handle email input change
    const handleEmailChange = (value: string) => {
        const emailValue = value;
        setEmail(emailValue);
        setLoginData('email', emailValue);
        setRegisterData('email', emailValue);
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
                    setErrors({});
                    setProgress(25);
                } catch (error) {
                    setEmailStatus('initial');
                    console.error('Error checking email:', error);
                    setErrors({});
                }
            } else {
                if (emailStatus === 'exists') {
                    router.post(
                        route('login.store'),
                        {
                            email: loginData.email,
                            password: loginData.password,
                            redirect: route('checkout'),
                        },
                        {
                            onError: (errors) => {
                                setErrors(errors);
                            },
                            onSuccess: () => {},
                        }
                    );
                } else {
                    if (registerData.email !== registerData.confirmEmail) {
                        setErrors({
                            confirmEmail: 'Les emails ne correspondent pas.',
                        });
                        return;
                    }
                    router.post(
                        route('register.store'),
                        {
                            email: registerData.email,
                            password: registerData.password,
                            password_confirmation: registerData.confirmPassword,
                            firstname: registerData.firstname,
                            lastname: registerData.lastname,
                            birthday: registerData.birthday,
                            redirect_to: route('checkout'),
                        },
                        {
                            onError: (errors) => {
                                setErrors(errors);
                            },
                            onSuccess: () => {},
                        }
                    );
                }
            }
        }
    };

    return (
        <div className="">
            <div className="space-y-2">
                <h2 className="text-xl font-black uppercase tracking-wider leading-none">
                    Où est-ce qu'on envoie tes billets ?
                </h2>
                <p className="pb-4 text-sm text-gray-700">
                    Entre ton e-mail pour te connecter ou créer un nouveau
                    compte
                </p>
            </div>
            <div>
                <Input
                    type="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={handleEmailChange}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                {emailStatus === 'exists' && (
                    <>
                        <Input
                            type="password"
                            placeholder="Mot de passe"
                            value={loginData.password}
                            onChange={(value) =>
                                setLoginData('password', value)
                            }
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </>
                )}

                {emailStatus === 'notExists' && submitOnce.current && (
                    <div className="space-y-2 mt-2">
                        <div className="space-y-1">
                            <Input
                                type="email"
                                placeholder="Confirmation de l'email"
                                value={registerData.confirmEmail}
                                onChange={(value) =>
                                    setRegisterData('confirmEmail', value)
                                }
                            />
                            {errors.confirmEmail && (
                                <p className="text-red-500 text-sm">
                                    {errors.confirmEmail}
                                </p>
                            )}
                        </div>
                        <div className="flex space-x-2 gap-2">
                            <div className="space-y-1 w-full">
                                <Input
                                    type="text"
                                    placeholder="Prénom"
                                    value={registerData.firstname}
                                    onChange={(value) =>
                                        setRegisterData('firstname', value)
                                    }
                                />
                                {errors.firstname && (
                                    <p className="text-red-500 text-sm">
                                        {errors.firstname}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-1 w-full">
                                <Input
                                    type="text"
                                    placeholder="Nom"
                                    value={registerData.lastname}
                                    onChange={(value) =>
                                        setRegisterData('lastname', value)
                                    }
                                />
                                {errors.lastname && (
                                    <p className="text-red-500 text-sm">
                                        {errors.lastname}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="Mot de passe"
                                value={registerData.password}
                                onChange={(value) =>
                                    setRegisterData('password', value)
                                }
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="Confirmation du mot de passe"
                                value={registerData.confirmPassword}
                                onChange={(value) =>
                                    setRegisterData('confirmPassword', value)
                                }
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Input
                                type="date"
                                placeholder="Date de naissance"
                                value={registerData.birthday ?? ''}
                                onChange={(value) =>
                                    setRegisterData('birthday', value)
                                }
                            />
                            {errors.birthday && (
                                <p className="text-red-500 text-sm">
                                    {errors.birthday}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <Button
                    className="w-full mt-4 uppercase "
                    variant={'customer_primary'}
                    onClick={handleCheckout}
                >
                    Continuer la commande
                </Button>
            </div>
        </div>
    );
};

// Component for CheckoutStep
const CheckoutStep = ({
    setProgress,
}: {
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}) => {
    useEffect(() => {
        setProgress(50);
    }, []);
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
                setProgress={setProgress}
            />
        </Elements>
    );
};
