import { Organization, PageProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { PlusIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Field } from './Field';
import { toast, useToast } from '../ui/use-toast';
import { capitalize, capitalizeFirstLetter } from '@/utils';

export const OrganizationSwitcher = () => {
    const {
        props: { auth },
    } = usePage<PageProps>();
    const [selectedOrganizationId, setSelectedOrganizationId] =
        useState<number>(
            auth.organizationLogged?.id ?? auth.user.organizations[0]?.id ?? 0
        );

    const { data, setData, post } = useForm({
        organizationId: selectedOrganizationId,
    });

    const isHandle = useRef(false);

    useEffect(() => {
        if (!isHandle.current) return;
        post(route('organizations.switch'));
    }, [data]);

    useEffect(() => {
        setSelectedOrganizationId(
            auth.organizationLogged?.id ?? auth.user.organizations[0]?.id ?? 0
        );
    }, [auth.organizationLogged, auth.user.organizations]);

    const handleSelect = (id: string) => {
        const selectedId = parseInt(id, 10);
        setSelectedOrganizationId(selectedId);
        setData('organizationId', selectedId);
        isHandle.current = true;
    };

    const selectedOrganization = auth.user.organizations.find(
        (org) => org.id === selectedOrganizationId
    ) as Organization;

    const [open, setOpen] = useState(false);

    return (
        <>
            <Select
                value={selectedOrganizationId.toString()}
                onValueChange={handleSelect}
            >
                <SelectTrigger className="w-52 flex items-center gap-2">
                    <SelectValue>
                        <div className="flex items-center gap-2 truncate">
                            <span className="shrink-0">
                                <img
                                    src={selectedOrganization?.logo}
                                    alt=""
                                    className="w-6 h-6 cover rounded-full"
                                />
                            </span>
                            {capitalizeFirstLetter(selectedOrganization.name)}
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Organisations</SelectLabel>
                        {auth.user.organizations.map((organization) => (
                            <SelectItem
                                key={organization.id}
                                value={organization.id?.toString() || ''}
                            >
                                <div className="flex items-center gap-2">
                                    <span className=" ">
                                        <img
                                            src={organization.logo}
                                            alt=""
                                            className="w-6 h-6 cover rounded-full"
                                        />
                                    </span>
                                    {capitalizeFirstLetter(organization.name)}
                                </div>
                            </SelectItem>
                        ))}
                        <Separator className="my-1" />
                        <Button
                            variant={'outline'}
                            className={'w-full'}
                            onClick={() => setOpen(true)}
                        >
                            <PlusIcon className="mr-2 " />
                            Créer une organisation
                        </Button>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <CreateOrganizationDialog open={open} handleOpen={setOpen} />
        </>
    );
};

interface CreateOrganizationFormProps {
    name: string;
    type: string;
    description: string;
    logo: string | File | null;
    website: string;
}

const CreateOrganizationDialog = ({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: (open: boolean) => void;
}) => {
    const { data, setData, post, errors, reset } =
        useForm<CreateOrganizationFormProps>({
            name: '',
            type: 'association',
            description: '',
            logo: '',
            website: '',
        });

    const handleSubmit = () => {
        post(route('shared.organizations.store'), {
            onSuccess: ({ props: { flash } }) => {
                reset();
                router.reload();
                if (handleOpen) handleOpen(false);

                toast({
                    title: 'Succès',
                    description: flash.success,
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer une organisation</DialogTitle>
                    <DialogDescription>
                        Créez une nouvelle organisation pour gérer vos
                        événements.
                    </DialogDescription>
                </DialogHeader>
                <CreateOrganizationForm
                    handleOpen={handleOpen}
                    data={data}
                    errors={errors}
                    setData={setData}
                    handleSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
};

export const CreateOrganizationForm = ({
    data,
    setData,
    errors,
    handleSubmit,
    handleOpen,
}: {
    data: CreateOrganizationFormProps;
    setData: (key: string, value: string | File | null) => void;
    errors: Record<string, string>;
    handleSubmit?: () => void;
    handleOpen?: (open: boolean) => void;
}) => {
    return (
        <>
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <Field
                        label="Nom"
                        id="name"
                        className="col-span-2"
                        errors={errors}
                    >
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setData('name', e.target.value)}
                        />
                    </Field>
                    <Field label="Type" id="type" errors={errors}>
                        <Select
                            onValueChange={(value: string) =>
                                setData('type', value)
                            }
                            defaultValue={data.type}
                        >
                            <SelectTrigger>
                                <SelectValue defaultValue={data.type} />
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectItem value="association">
                                    Association
                                </SelectItem>
                                <SelectItem value="entreprise">
                                    Entreprise
                                </SelectItem>
                                <SelectItem value="label">
                                    Label de musique
                                </SelectItem>
                                <SelectItem value="collectif">
                                    Collectif artistique
                                </SelectItem>
                                <SelectItem value="particulier">
                                    Particulier
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <Field
                    label="Description"
                    id="description"
                    errors={errors}
                    required={false}
                >
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setData('description', e.target.value)
                        }
                    />
                    <p className="text-xs text-muted-foreground">
                        &Eacute;crivez une brève description de votre
                        organisation (Mission, style musical, histoire, etc.)
                    </p>
                </Field>

                <Field label="Logo" id="logo" errors={errors} required={false}>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-24 rounded-md shadow-sm border border-input cursor-pointer "
                        >
                            {!data.logo ? (
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
                                        AVIF, WEBP, SVG, PNG, JPG ou JPEG. Max
                                        2Mo
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center  gap-2">
                                    <div className="w-full h-16">
                                        <img
                                            src={
                                                data.logo instanceof File
                                                    ? URL.createObjectURL(
                                                          data.logo
                                                      )
                                                    : data.logo
                                            }
                                            alt="Image de couverture"
                                            className="w-full h-full fit-cover rounded-md"
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="mt-2"
                                        onClick={() => setData('logo', null)}
                                    >
                                        Changer l'image
                                    </Button>
                                </div>
                            )}
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp,image/avif"
                                onChange={(e) => {
                                    setData(
                                        'logo',
                                        e.target.files?.[0] || null
                                    );
                                }}
                            />
                        </label>
                    </div>
                </Field>
                <Field
                    label="Site web"
                    id="website"
                    required={false}
                    errors={errors}
                >
                    <Input
                        id="website"
                        value={data.website}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData('website', e.target.value)
                        }
                    />
                </Field>
            </div>
            {handleSubmit && (
                <DialogFooter>
                    <Button
                        type="submit"
                        variant="secondary"
                        className="mt-2 md:mt-0"
                        onClick={() => handleOpen && handleOpen(false)}
                    >
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit}>Sauvegarder</Button>
                </DialogFooter>
            )}
        </>
    );
};
