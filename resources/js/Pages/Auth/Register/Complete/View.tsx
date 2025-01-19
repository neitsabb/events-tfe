import React, { useEffect } from 'react';
import { AuthLayout } from '../Join/View';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Input } from '@/Components/Customer/Input';
import { Button } from '@/Components/ui/button';
import { Error } from '../../Login/View';

const View = () => {
    const { email } = usePage<PageProps<{ email: string }>>().props;

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [photo, setPhoto] = React.useState<string>('');
    const [birthday, setBirthday] = React.useState<Date | null>(null);

    const { setData, post, errors, processing } = useForm({
        email: email,
        firstname: firstName,
        lastname: lastName,
        password: password,
        password_confirmation: confirmPassword,
        image: photo,
        birthday: birthday,
    });

    useEffect(() => {
        setData({
            email,
            firstname: firstName,
            lastname: lastName,
            password,
            password_confirmation: confirmPassword,
            image: photo,
            birthday: birthday,
        });
    }, [
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        photo,
        birthday,
    ]);

    const handleSubmit = () => {
        post(route('register.complete.store'), {
            preserveState: true,
        });
    };

    return (
        <AuthLayout title="Compléter votre inscription">
            <p className="text-center text-xs font-regular text-gray-800">
                Vous créez un compte pour{' '}
                <span className="font-regular text-primary">{email}</span>
            </p>
            <div className="bg-white px-4 py-6 mt-4 shadow flex flex-col gap-4">
                <div>
                    <Input
                        type="file"
                        placeholder="Photo de profil"
                        onChange={setPhoto}
                        value={photo}
                        required={false}
                    />
                </div>
                <div className="flex gap-3">
                    <div className="space-y-2 w-full">
                        <Input
                            type="text"
                            placeholder="Prénom"
                            value={firstName}
                            onChange={setFirstName}
                            required={true}
                        />
                        {errors.firstname && (
                            <Error message={errors.firstname} />
                        )}
                    </div>
                    <div className="space-y-2 w-full">
                        <Input
                            type="text"
                            value={lastName}
                            onChange={setLastName}
                            placeholder="Nom"
                            required={true}
                        />
                        {errors.lastname && <Error message={errors.lastname} />}
                    </div>
                </div>
                <div className="space-y-2">
                    <Input
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Mot de passe"
                        required={true}
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>
                <div className="space-y-2">
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Confirmer le mot de passe"
                        required={true}
                    />
                    {errors.password_confirmation && (
                        <Error message={errors.password_confirmation} />
                    )}
                </div>
                <div>
                    <Input
                        type="date"
                        value={birthday}
                        onChange={setBirthday}
                        placeholder="Date de naissance"
                        required={true}
                    />
                    {errors.birthday && <Error message={errors.birthday} />}
                </div>
                <Button
                    variant="customer_primary"
                    disabled={processing}
                    onClick={handleSubmit}
                >
                    Créer mon compte
                </Button>
            </div>
        </AuthLayout>
    );
};

export default View;
