import { ErrorsProps } from '@/types';
import { Field } from '../../Field';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Badge } from '@/Components/ui/badge';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const GeneralStep = ({
    informations,
    setInformations,
    errors,
}: {
    informations: {
        title: string;
        description: string;
        tags: string[];
    };
    setInformations: Dispatch<
        SetStateAction<{
            title: string;
            description: string;
            tags: string[];
        }>
    >;
    errors: ErrorsProps;
}) => {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        setInformations({ ...informations, tags });
    }, [tags]);

    return (
        <div className="space-y-4">
            <Field label="Nom de l'événement" id="name">
                <Input
                    name="name"
                    value={informations.title}
                    onChange={(e) =>
                        setInformations({
                            ...informations,
                            title: e.target.value,
                        })
                    }
                />
                {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                )}
            </Field>
            <Field label="Description" id="description" required={false}>
                <Textarea
                    name="description"
                    value={informations.description}
                    onChange={(e) =>
                        setInformations({
                            ...informations,
                            description: e.target.value,
                        })
                    }
                />
            </Field>
            <Field label="Mots-clés" id="keywords" required={false}>
                <InputTags tags={tags} setTags={setTags} />
                {errors.tags && (
                    <p className="text-xs text-red-500">{errors.tags}</p>
                )}
            </Field>
        </div>
    );
};

export const InputTags = ({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: (tags: string[]) => void;
}) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="space-y-3">
            <Input
                name="keywords"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.length > 0 ? (
                    tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={'outline'}
                            className="flex items-center gap-1 rounded-full px-3 py-1.5 uppercase text-secondary-foreground"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-xs !px-0 !py-0"
                            >
                                <X size={12} />
                            </button>
                        </Badge>
                    ))
                ) : (
                    <p className="text-xs text-muted-foreground">
                        Entrez des mots-clés pour décrire votre événement et
                        appuyez sur Entrer
                    </p>
                )}
            </div>
        </div>
    );
};
