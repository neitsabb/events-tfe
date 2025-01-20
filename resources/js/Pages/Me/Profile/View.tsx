import { Error } from '@/Components/Customer/Error';
import { Input } from '@/Components/Customer/Input';
import { Button } from '@/Components/ui/button';
import { ProfileLayout } from '@/Layouts/Customer/ProfileLayout';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

const View = () => {
    const { auth, flash } = usePage<PageProps>().props;

    const { data, setData, post, errors } = useForm({
        image: auth.user.image,
        firstname: auth.user.firstname,
        lastname: auth.user.lastname,
        email: auth.user.email,
        birthday: auth.user.birthday,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('customer.me.profile.update'), {
            onSuccess: () => {
                console.log('success');
            },
            onError: (e) => {
                console.log('error', e);
            },
        });
    };

    return (
        <ProfileLayout title="Mes informations">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {flash.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {flash.success}
                    </div>
                )}
                <Input
                    type="file"
                    placeholder="Photo de profil"
                    value={data.image}
                    onChange={(e) => setData('image', e)}
                />
                {errors.image && <Error message={errors.image} />}
                <div className="w-full grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <Input
                            type="text"
                            placeholder="Prénom"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e)}
                        />
                        {errors.firstname && (
                            <Error message={errors.firstname} />
                        )}
                    </div>
                    <div className="space-y-1">
                        <Input
                            type="text"
                            placeholder="Nom"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e)}
                        />
                        {errors.lastname && <Error message={errors.lastname} />}
                    </div>
                </div>
                <div className="space-y-1">
                    <Input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={data.email}
                        onChange={(e) => setData('email', e)}
                    />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input
                        type="date"
                        placeholder="Date de naissance"
                        value={data.birthday}
                        onChange={(e) => setData('birthday', e)}
                    />
                    {errors.birthday && <Error message={errors.birthday} />}
                </div>

                <div>
                    <Button variant="customer_primary">Enregistrer</Button>
                </div>
            </form>
        </ProfileLayout>
    );
};

export default View;
