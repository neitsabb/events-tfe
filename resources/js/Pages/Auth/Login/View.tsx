import { Button } from '@/Components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { Input } from '@/Components/Customer/Input';
import { useEffect, useState } from 'react';
import { Error } from '@/Components/Customer/Error';
import { AuthLayout } from '@/Layouts/Customer/AuthLayout';

const View = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setData, post, errors, processing } = useForm({
        email: email,
        password: password,
    });

    const handleSubmit = () => {
        post(route('login.store'), {
            preserveState: true,
        });
    };

    useEffect(() => {
        setData({ email, password });
    }, [email, password]);

    return (
        <AuthLayout title="Bienvenue 👋">
            <div className="bg-white px-4 py-6 mt-4 shadow flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Adresse e-mail"
                            value={email}
                            onChange={setEmail}
                        />
                        {errors.email && <Error message={errors.email} />}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={setPassword}
                        />
                        <div className="flex items-center justify-between">
                            {errors.email && <Error message={errors.email} />}

                            <Link
                                href="/forgot-password"
                                className="text-xs text-muted underline ml-auto"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                    </div>

                    <Button
                        variant="customer_primary"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        Se connecter
                    </Button>
                </div>
            </div>
            <p className="text-center text-sm font-regular text-gray-800 mt-4">
                Vous n'avez pas de compte ?{' '}
                <Link href="/signup" className="text-primary underline">
                    Inscrivez-vous
                </Link>
            </p>
        </AuthLayout>
    );
};

export default View;
