import { Input } from '@/Components/ui/input';
import { useEffect, useState } from 'react';
import { Field } from '@/Components/Admin/Field';
import { Checkbox } from '@/Components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import { FormSection } from '@/Components/Admin/FormSection';
import { Event } from '@/types';

type PreferenceValue = null | string | string[];

interface Preference {
    key: string;
    value: PreferenceValue;
}

interface PreferenceFormProps {
    event: Event;
}

interface FormData {
    preferences: Preference[];
}

export const PreferencesForm = ({ event }: PreferenceFormProps) => {
    const [preferences, setPreferences] = useState<Preference[]>(
        !event.preferences || event.preferences.length === 0
            ? [
                  { key: 'legal_age', value: null },
                  { key: 'required_fields', value: [] },
              ]
            : event.preferences
    );

    const { setData, post } = useForm<FormData>({
        preferences: [],
    });

    const updatePreference = (key: string, newValue: PreferenceValue) => {
        setPreferences((prevPreferences) =>
            prevPreferences.map((pref) =>
                pref.key === key ? { ...pref, value: newValue } : pref
            )
        );
    };

    useEffect(() => {
        setData('preferences', preferences);
    }, [preferences]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                <Field label="Âge minimum" id="age" className="pt-8">
                    <div className="flex items-center gap-4">
                        <Input
                            type="number"
                            name="age"
                            className="w-24 h-12"
                            value={
                                preferences.find((p) => p.key === 'legal_age')
                                    ?.value || ''
                            }
                            onChange={(e) =>
                                updatePreference('legal_age', e.target.value)
                            }
                        />
                        <span>ans</span>
                    </div>
                </Field>
            </FormSection>
            <FormSection
                title="Champs obligatoires"
                description="Vous pouvez choisir de demander des informations supplémentaires aux acheteurs de billets."
                onSubmit={handleSubmit}
            >
                <div className="space-y-3">
                    <CheckboxField
                        id="email"
                        name="email"
                        label="Email"
                        checked={checkIfPreferenceIsChecked('email')}
                        onChange={(e) =>
                            handleCheckboxChange('email', e.target.checked)
                        }
                    />
                    <CheckboxField
                        id="phone"
                        name="phone"
                        label="Téléphone"
                        checked={checkIfPreferenceIsChecked('phone')}
                        onChange={(e) =>
                            handleCheckboxChange('phone', e.target.checked)
                        }
                    />
                    <CheckboxField
                        id="birth"
                        name="birth"
                        label="Date de naissance"
                        checked={checkIfPreferenceIsChecked('birth')}
                        onChange={(e) =>
                            handleCheckboxChange('birth', e.target.checked)
                        }
                    />
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
                onCheckedChange={(checked) =>
                    onChange({
                        target: { id, name, value: '', checked: !!checked },
                    } as unknown as React.ChangeEvent<HTMLInputElement>)
                }
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};
