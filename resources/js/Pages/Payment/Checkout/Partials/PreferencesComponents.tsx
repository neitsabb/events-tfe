import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { capitalizeFirstLetter } from '@/utils';

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

type ValueTypes = string | { [key: string]: string };
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
            <Label>Age</Label>
            <Input
                type="number"
                placeholder="Entrez votre âge"
                onChange={(e) => onChange('legal_age', e.target.value)}
            />

            {errors.legal_age ? (
                <p className="text-red-500 text-xs italic">
                    {errors.legal_age}
                </p>
            ) : (
                <p className="text-xs italic mt-1 text-secondary-foreground">
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
                        <Label>
                            {capitalizeFirstLetter(getFieldLabel(field))}
                        </Label>
                        <Input
                            type={getFieldInputType(field)}
                            placeholder={`Entrez votre ${getFieldLabel(field)}`}
                            onChange={(e) => onChange(field, e.target.value)}
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
