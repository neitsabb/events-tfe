import { Input } from '@/Components/Customer/Input';

const fieldLabels: Record<string, string> = {
    birth: 'date de naissance',
    email: 'adresse e-mail',
    phone: 'numéro de téléphone',
    legal_age: 'âge minimum',
};

const fieldInputTypes: Record<string, string> = {
    birth: 'date',
    email: 'email',
    phone: 'tel',
    legal_age: 'number',
};

const getFieldLabel = (field: string): string => {
    return fieldLabels[field] || field;
};

const getFieldInputType = (field: string): string => {
    return fieldInputTypes[field] || 'text';
};

export type ValueTypes = string | { [key: string]: string };
export const PreferenceComponents: Record<
    string,
    React.FC<{
        value: string | ValueTypes;
        errors: Record<string, string>;
        onChange: (field: string, value: ValueTypes) => void;
    }>
> = {
    legal_age: ({ value, errors, onChange }) => (
        <div className="space-y-1">
            <Input
                type="number"
                placeholder="âge"
                onChange={(value) => onChange('legal_age', value)}
            />

            {errors.legal_age ? (
                <p className="text-red-500 text-xs italic">
                    {errors.legal_age}
                </p>
            ) : (
                <p className="text-xs italic mt-1 text-gray-500">
                    Tu dois avoir au minimum {value as string} ans pour acheter
                    des billets pour cet événement.
                </p>
            )}
        </div>
    ),
    required_fields: ({ value, errors, onChange }) => (
        <div>
            {Array.isArray(value) &&
                value.map((field: string) => (
                    <div key={field} className="mt-2 space-y-1">
                        <Input
                            type={getFieldInputType(field)}
                            value={value[field as keyof typeof value]}
                            placeholder={getFieldLabel(field)}
                            onChange={(value) => onChange(field, value)}
                        />
                        {errors[field] && (
                            <p className="text-red-500 text-xs italic">
                                {errors[field]}
                            </p>
                        )}
                    </div>
                ))}
        </div>
    ),
};
