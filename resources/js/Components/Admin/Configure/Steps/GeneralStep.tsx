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
        image: File;
    };
    setInformations: Dispatch<
        SetStateAction<{
            title: string;
            description: string;
            tags: string[];
            image: File;
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
            <Field label="Image de couverture" id="cover" required={false}>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-24 rounded-md shadow-sm border border-input cursor-pointer "
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-400 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>

                            <p className="text-xs text-gray-400 dark:text-gray-400">
                                AVIF, WEBP, SVG, PNG, JPG ou JPEG. Max 2Mo
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp,image/avif"
                            onChange={(e) => {
                                setInformations({
                                    ...informations,
                                    image: e.target.files[0],
                                });
                            }}
                        />
                    </label>
                </div>
                {errors.image && (
                    <p className="text-xs text-red-500">{errors.image}</p>
                )}
            </Field>
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
