import { Error } from '@/Components/Customer/Error';
import { Input } from '@/Components/Customer/Input';
import { Button } from '@/Components/ui/button';
import { AuthLayout } from '@/Layouts/Customer/AuthLayout';

import { PageProps } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const View = () => {
    const { auth } = usePage<PageProps>().props;
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('association'); // Valeur par défaut
    const [logo, setLogo] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [website, setWebsite] = useState<string>('');

    const { data, setData, errors, processing, post } = useForm({
        name,
        type,
        logo,
        description,
        website,
    });

    useEffect(() => {
        setData({ name, type, logo, description, website });
    }, [name, type, logo, description, website]);

    const handleSubmit = () => {
        console.log(data);
        post(route('shared.organizations.store'), {
            preserveScroll: true,
            onSuccess: () => {
                router.get(route('dashboard'));
            },
        });
    };

    return (
        <AuthLayout title="Devenez un organisateur">
            <Head title="Devenez un organisateur" />

            <div className="bg-white px-4 py-6 mt-4 shadow flex flex-col gap-4">
                <div className="space-y-2">
                    <Input
                        type="file"
                        value={logo}
                        placeholder="URL du logo"
                        onChange={setLogo}
                    />
                    {errors.logo && <Error message={errors.logo} />}
                </div>

                <div className="space-y-2">
                    <Input
                        type="text"
                        value={name}
                        placeholder="Nom de l'organisation"
                        onChange={setName}
                        required={true}
                    />
                    {errors.name ? (
                        <Error message={errors.name} />
                    ) : (
                        <p className="text-xs text-gray-400">
                            L’URL de votre page organisateur sera basée sur ce
                            nom.
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Input
                        type="select"
                        value={type}
                        placeholder="Type d'organisation"
                        onChange={setType}
                        required={true}
                        options={[
                            { value: 'association', name: 'Association' },
                            { value: 'entreprise', name: 'Entreprise' },
                            { value: 'label', name: 'Label de musique' },
                            {
                                value: 'collectif',
                                name: 'Collectif artistisque',
                            },
                            { value: 'particulier', name: 'Particulier' },
                        ]}
                    />
                    {errors.type && <Error message={errors.type} />}
                </div>
                <div className="space-y-2">
                    <Input
                        type="textarea"
                        value={description}
                        placeholder="Description"
                        onChange={setDescription}
                    />
                    {errors.description && (
                        <Error message={errors.description} />
                    )}
                </div>
                <div className="space-y-2">
                    <Input
                        type="text"
                        value={website}
                        placeholder="Site web"
                        onChange={setWebsite}
                    />
                    {errors.website && <Error message={errors.website} />}
                </div>
                <Button
                    variant="customer_primary"
                    onClick={handleSubmit}
                    disabled={processing}
                >
                    Créer ma première organisation
                </Button>
            </div>
        </AuthLayout>
    );
};

export default View;
