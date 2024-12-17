import { Input } from '@/Components/ui/input';
import { useEffect, useState } from 'react';
import { Field } from '@/Components/Admin/Field';
import { Checkbox } from '@/Components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import { EventProps } from '@/types';
import { FormSection } from '@/Components/Admin/FormSection';

interface Preference {
    key: string;
    value: any; // Vous pouvez spécifier un type plus précis si nécessaire
}

export const PreferencesForm = ({ event }: EventProps) => {
    const [preferences, setPreferences] = useState<Preference[]>(
        !event.preferences || event.preferences.length === 0
            ? [
                  { key: 'legal_age', value: null },
                  { key: 'required_fields', value: [] },
              ]
            : event.preferences
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        preferences: [],
    });

    const updatePreference = (key: string, newValue: any) => {
        setPreferences((prevPreferences) =>
            prevPreferences.map((pref) =>
                pref.key === key ? { ...pref, value: newValue } : pref
            )
        );
    };

    useEffect(() => {
        setData('preferences', preferences as never);
    }, [preferences]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('events.update', { id: event.id }), {
            onSuccess: () => {
                console.log('Preferences updated');
            },
            onError: (e) => {
                console.log('An error occurred', e);
            },
        });
    };

    const handleCheckboxChange = (key: string, checked: boolean) => {
        setPreferences((prevPreferences) => {
            const updatedPreferences = [...prevPreferences];
            const preference = updatedPreferences.find(
                (p) => p.key === 'required_fields'
            );
            if (preference) {
                const values = preference.value as string[];
                if (checked) {
                    values.push(key);
                } else {
                    const index = values.indexOf(key);
                    if (index > -1) {
                        values.splice(index, 1);
                    }
                }
                preference.value = values;
            }
            return updatedPreferences;
        });
    };

    const checkIfPreferenceIsChecked = (key: string) => {
        const preference = preferences.find((p) => p.key === 'required_fields');
        if (preference) {
            return (preference.value as string[]).includes(key);
        }
        return false;
    };

    return (
        <>
            <FormSection
                title="Âge légal"
                description="Vous pouvez fixer un âge minimum pour votre événement ici."
                onSubmit={handleSubmit}
            >
                <div
                    className={`transition-all duration-300  max-h-40 opacity-100`}
                >
                    <Field
                        label="Âge minimum"
                        id="age"
                        required={false}
                        className="pt-8"
                    >
                        <div className="flex items-center gap-4">
                            <Input
                                type="number"
                                name="age"
                                className="w-24 h-12"
                                value={
                                    preferences.find(
                                        (p) => p.key === 'legal_age'
                                    )?.value || ''
                                }
                                onChange={(e) =>
                                    updatePreference(
                                        'legal_age',
                                        e.target.value
                                    )
                                }
                            />
                            <span>ans</span>
                        </div>
                    </Field>
                </div>
            </FormSection>
            <FormSection
                title="Champs obligatoires"
                description="Vous pouvez choisir de demander des informations supplémentaires aux acheteurs de billets.
								<br/> Cela peut conduire à une moins bonne conversion."
                onSubmit={handleSubmit}
            >
                <div className="space-y-3">
                    <CheckboxField
                        id="email"
                        name="email"
                        label="Email"
                        checked={checkIfPreferenceIsChecked('email')}
                        onChange={(e) => handleCheckboxChange('email', e)}
                    />
                    <CheckboxField
                        id="phone"
                        name="phone"
                        label="Téléphone"
                        checked={checkIfPreferenceIsChecked('phone')}
                        onChange={(e) => handleCheckboxChange('phone', e)}
                    />
                    <CheckboxField
                        id="birth"
                        name="birth"
                        label="Date de naissance"
                        checked={checkIfPreferenceIsChecked('birth')}
                        onChange={(e) => handleCheckboxChange('birth', e)}
                    />
                    <p className="text-xs text-muted-foreground pt-2">
                        Nous vous recommandons de ne demander que les
                        informations dont vous avez réellement besoin.
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
    onChange,
    checked,
}: {
    id: string;
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={id}
                name={name}
                checked={checked}
                onCheckedChange={onChange as () => void}
            />
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
        </div>
    );
};
