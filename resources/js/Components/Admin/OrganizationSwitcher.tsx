import { PageProps } from '@/types';
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
import { useToast } from '../ui/use-toast';

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
        post(route('organizations.switch'), {
            onSuccess: () => {
                console.log('success');
            },
        });
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
                <SelectTrigger className="w-40 md:w-48 flex items-center gap-2 [&>span]:flex [&>span]:w-full  [&>span]:truncate [&>span]:gap-1">
                    <SelectValue>{selectedOrganization?.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Organisations</SelectLabel>
                        {auth.user.organizations.map((organization) => (
                            <SelectItem
                                key={organization.id}
                                value={organization.id.toString()}
                            >
                                <div className="flex items-center gap-3">
                                    {organization.name}
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

const CreateOrganizationDialog = ({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: (open: boolean) => void;
}) => {
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
                <CreateOrganizationForm handleOpen={handleOpen} />
            </DialogContent>
        </Dialog>
    );
};

const CreateOrganizationForm = ({
    handleOpen,
}: {
    handleOpen: (open: boolean) => void;
}) => {
    const { toast } = useToast();
    const [genres] = useState<string[]>([]);
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        type: 'association',
        description: '',
        genres: genres,
        logo: null as File | string | null,
        website: '',
    });

    useEffect(() => {
        setData('genres', genres);
    }, [genres]);

    const handleSubmit = () => {
        post(route('organizations.store'), {
            onSuccess: (response) => {
                reset();
                router.reload();
                handleOpen(false);

                toast({
                    title: 'Succès',
                    description: response.props.flash.success,
                });
            },
        });
    };

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
                                <SelectValue />
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
                                <SelectItem value="festival">
                                    Festival
                                </SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <Field label="Description" id="description" errors={errors}>
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

                <Field label="Logo" id="logo" required={false} errors={errors}>
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
            <DialogFooter>
                <Button
                    variant="secondary"
                    className="mt-2 md:mt-0"
                    onClick={() => {
                        handleOpen(false);
                    }}
                >
                    Annuler
                </Button>
                <Button onClick={handleSubmit}>Sauvegarder</Button>
            </DialogFooter>
        </>
    );
};
