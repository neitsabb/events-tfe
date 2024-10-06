import { Field } from '@/Components/Admin/Field';
import { Avatar } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { OrganizationSettingsLayout } from '@/Layouts/Admin/OrganizationSettingsLayout';
import { FormSection } from '@/Pages/Events/Admin/Show/Settings/General/Form';
import { usePage } from '@inertiajs/react';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { TrashIcon } from '@radix-ui/react-icons';
import { PlusIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { useToast } from '@/Components/ui/use-toast';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { validateEmail } from '@/utils';

const View = () => {
    const { toast } = useToast();
    const { props } = usePage<PageProps>();
    const [users, setUsers] = useState<User[]>([]);

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleAddUser = () => {
        if (
            !email ||
            props.auth.organizationLogged.users.find(
                (user) => user.email === email
            ) ||
            users.find((user) => user.email === email)
        ) {
            setError('Cet utilisateur est déjà dans votre organisation.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        router.post(
            route('organizations.invite.check'),
            {
                email: email,
            },
            {
                preserveScroll: true,
                onSuccess: ({
                    props: {
                        flash: { user },
                    },
                }) => {
                    setUsers([
                        ...users,
                        typeof user === 'object'
                            ? user
                            : { email, name: 'Anonyme' },
                    ]);

                    setEmail('');
                },
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    };

    const handleRemoveUser = (email: string) =>
        setUsers(users.filter((user) => user.email !== email));

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route('organizations.invite'),
            {
                users: users.map((user) => user.email),
            },
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    setUsers([]);
                    toast({
                        title: 'Invitations envoyées',
                        description:
                            'Les invitations ont été envoyées avec succès.',
                    });
                },
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    };

    const handleRoleChange = (userId: number, role: string) => {
        // Post request to change role
        router.post(
            route('organizations.settings.update.role'),
            {
                userId: userId,
                role: role,
            },
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    toast({
                        title: 'Rôle modifié',
                        description:
                            "Le rôle de l'utilisateur a été modifié avec succès.",
                    });
                },
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    };

    return (
        <OrganizationSettingsLayout>
            <FormSection
                title="Gérer les membres"
                description="Vous pouvez ajouter des collaborateurs à votre organisation en entrant leur adresse e-mail ci-dessous."
                disabled={!users.length}
            >
                <ul role="list" className="divide-y divide-gray-100">
                    {props.auth.organizationLogged.users.map((user) => (
                        <li
                            className="flex justify-between items-center  py-5"
                            key={user.email}
                        >
                            <div className="flex min-w-0 gap-x-2">
                                <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50 grid place-content-center">
                                    <AvatarFallback>
                                        {user.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                    <AvatarImage src={user.picture} />
                                </Avatar>
                                <img className="" src="" alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {user.name || 'Anonyme'}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 flex gap-2">
                                {user.pivot.role !== 'owner' && (
                                    <Select
                                        defaultValue={user.pivot.role}
                                        onValueChange={(role) =>
                                            handleRoleChange(user.id, role)
                                        }
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="member">
                                                    Membre
                                                </SelectItem>
                                                <SelectItem value="admin">
                                                    Administrateur
                                                </SelectItem>
                                                <SelectItem
                                                    value="owner"
                                                    disabled={true}
                                                >
                                                    Propriétaire
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                                <Button variant={'secondary'}>
                                    <TrashIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </FormSection>
            <FormSection
                title="Ajouter des membres"
                description="Vous pouvez ajouter des membres à votre organisation en entrant leur adresse e-mail ci-dessous."
                disabled={!users.length}
                onSubmit={handleSubmit}
            >
                <div className="flex items-center gap-x-4">
                    <Input
                        placeholder="Entrez une adresse e-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        className={
                            error
                                ? 'border-red-500 focus:ring-red-500 animate-shake'
                                : ''
                        }
                    />
                    <Button
                        type={'button'}
                        onClick={handleAddUser}
                        size={'icon'}
                        className="rounded-full shrink-0"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </Button>
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <ul role="list" className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <li
                            className="flex justify-between items-center  py-5"
                            key={user.email}
                        >
                            <div className="flex min-w-0 gap-x-2">
                                <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50 grid place-content-center">
                                    <AvatarFallback>
                                        {user.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                    <AvatarImage src={user.picture} />
                                </Avatar>
                                <img className="" src="" alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {user.name || 'Anonyme'}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {!user.name
                                            ? user.email +
                                              ' • Cet utilisateur recevra un e-mail pour compléter son profil.'
                                            : user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleRemoveUser(user.email)}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </FormSection>
        </OrganizationSettingsLayout>
    );
};

export default View;
