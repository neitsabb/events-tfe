import { Field } from '@/Components/Admin/Field';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { OrganizationSettingsLayout } from '@/Layouts/Admin/OrganizationSettingsLayout';
import { FormSection } from '@/Pages/Events/Admin/Show/Settings/General/Form';

const View = () => {
  return (
    <OrganizationSettingsLayout>
      <FormSection
        title="Membres"
        description="Vous pouvez gérer les membres de votre organisation ici."
        disabled={true}
      >
        <Field label="Nom" id="name">
          <Input id="name" />
        </Field>
      </FormSection>
    </OrganizationSettingsLayout>
  );
};

export default View;
