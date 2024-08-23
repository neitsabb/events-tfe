import { Input } from '@/Components/ui/input';
import { FormSection } from '../General/Form';
import Checkbox from '@/Components/Checkbox';
import { useState } from 'react';
import { Field } from '@/Components/Admin/Field';

export const PreferencesForm = () => {
  // Déclarez un état local pour suivre si la checkbox est cochée ou non
  const [isAgeChecked, setIsAgeChecked] = useState(false);

  // Fonction pour gérer le changement de la checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgeChecked(e.target.checked);
  };

  return (
    <>
      <FormSection
        title="Âge légal"
        description="Vous pouvez fixer un âge minimum pour votre événement ici."
      >
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            name="checkAge"
            className="peer"
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Je souhaite fixer un âge minimum pour cet événement
          </label>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAgeChecked
              ? 'max-h-40 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <Field label="Âge minimum" id="age" required={false} className="pt-8">
            <div className="flex items-center gap-4">
              <Input type="number" name="age" className="w-16 h-12" />
              <span>ans</span>
            </div>
          </Field>
        </div>
      </FormSection>
      <FormSection
        title="Champs obligatoires"
        description="Vous pouvez choisir de demander des informations supplémentaires aux acheteurs de billets.
								<br/> Cela peut conduire à une moins bonne conversion."
      >
        <div className="space-y-3">
          <CheckboxField id="email" name="email" label="Email" />
          <CheckboxField id="phone" name="phone" label="Téléphone" />
          <CheckboxField id="birth" name="birth" label="Date de naissance" />
          <p className="text-xs text-muted-foreground pt-2">
            Nous vous recommandons de ne demander que les informations dont vous
            avez réellement besoin.
          </p>
        </div>
      </FormSection>
    </>
  );
};

const CheckboxField = ({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} name={name} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
