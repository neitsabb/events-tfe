import { Field } from '@/Components/Admin/Field';
import { FormSection } from '@/Components/Admin/FormSection';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { OrganizationSettingsLayout } from '@/Layouts/Admin/OrganizationSettingsLayout';

const View = () => {
    return (
        <OrganizationSettingsLayout>
            <FormSection
                title="Informations générales"
                description="Vous pouvez éditer les informations générales de votre organisation ici."
                disabled={true}
            >
                <Field label="Nom" id="name">
                    <Input id="name" />
                </Field>
                <Field label="Description" id="description">
                    <Textarea id="description" />
                </Field>
                <Field label="Site web" id="website" required={false}>
                    <Input id="website" />
                </Field>
                <Field label="Logo" id="logo" required={false}>
                    <Input id="logo" type="file" />
                </Field>
            </FormSection>
        </OrganizationSettingsLayout>
    );
};

export default View;
