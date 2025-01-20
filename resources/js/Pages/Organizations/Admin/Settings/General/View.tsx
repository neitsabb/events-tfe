import { FormSection } from '@/Components/Admin/FormSection';
import { CreateOrganizationForm } from '@/Components/Admin/OrganizationSwitcher';
import { toast } from '@/Components/ui/use-toast';
import { OrganizationSettingsLayout } from '@/Layouts/Admin/OrganizationSettingsLayout';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

const View = () => {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, errors } = useForm({
        name: auth.organizationLogged.name,
        type: auth.organizationLogged.type,
        description: auth.organizationLogged.description,
        website: auth.organizationLogged.website,
        logo: auth.organizationLogged.logo,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('organizations.update', auth.organizationLogged.id), {
            onSuccess: ({ props: { flash } }) => {
                toast({
                    title: 'Succès',
                    description: flash.success,
                });
            },
        });
    };

    return (
        <OrganizationSettingsLayout>
            <FormSection
                title="Informations générales"
                description="Vous pouvez éditer les informations générales de votre organisation ici."
                onSubmit={handleSubmit}
            >
                <CreateOrganizationForm
                    data={data}
                    errors={errors}
                    setData={setData}
                />
            </FormSection>
        </OrganizationSettingsLayout>
    );
};

export default View;
