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
            auth.organizationLogged?.id || auth.user.organizations[0]?.id
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
            auth.organizationLogged?.id || auth.user.organizations[0]?.id
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
    );

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
                            {capitalizeFirstLetter(selectedOrganization?.name)}
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Organisations</SelectLabel>
                        {auth.user.organizations.map((organization) => (
                            <SelectItem
                                key={organization.id}
                                value={organization.id.toString()}
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
    logo: string;
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
                    <Input
                        type="file"
                        id="logo"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData('logo', e.target.files?.[0] || null)
                        }
                    />
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
