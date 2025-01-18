import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Avatar } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { OrganizationSettingsLayout } from '@/Layouts/Admin/OrganizationSettingsLayout';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { TrashIcon } from '@radix-ui/react-icons';
import { PlusIcon } from 'lucide-react';
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
import { FormSection } from '@/Components/Admin/FormSection';
import { PageProps, User } from '@/types';

// Sous-composant pour afficher un utilisateur
const UserListItem = ({
    user,
    handleRoleChange,
    handleDeleteUser,
}: {
    user: User;
    handleRoleChange: (userId: number, role: string) => void;
    handleDeleteUser: (email: string) => void;
}) => (
    <li
        className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center py-5"
        key={user.email}
    >
        <div className="flex min-w-0 gap-x-2">
            <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50 grid place-content-center">
                <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
                <AvatarImage src={user.picture} />
            </Avatar>
            <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                    {user.name || user.email}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {user.name
                        ? user.email
                        : 'Cet utilisateur n’a pas encore complété son profil.'}
                </p>
            </div>
        </div>
        <div className="shrink-0 flex flex-col md:flex-row gap-2">
            {user.pivot.role !== 'owner' && (
                <Select
                    defaultValue={user.pivot.role}
                    onValueChange={(role) => handleRoleChange(user.id, role)}
                >
                    <SelectTrigger className="w-full md:w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="member">Membre</SelectItem>
                            <SelectItem value="admin">
                                Administrateur
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            <Button
                variant="secondary"
                type="button"
                onClick={() => handleDeleteUser(user.email)}
            >
                <TrashIcon className="w-4 h-4" />
            </Button>
        </div>
    </li>
);

// Sous-composant pour afficher un utilisateur invité
const InvitedUserListItem = ({
    user,
    handleRemoveUser,
}: {
    user: User;
    handleRemoveUser: (email: string) => void;
}) => {
    console.log(user);
    return (
        <li className="flex justify-between items-center py-5" key={user.email}>
            <div className="flex min-w-0 gap-x-2">
                <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50 grid place-content-center">
                    <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                    <AvatarImage src={user.picture} />
                </Avatar>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {user.name || 'Anonyme'}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {user.name === 'Anonyme'
                            ? `${user.email} • Cet utilisateur recevra un e-mail pour compléter son profil.`
                            : user.email}
                    </p>
                </div>
            </div>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => handleRemoveUser(user.email)}
            >
                Supprimer
            </Button>
        </li>
    );
};

const View = () => {
    const { toast } = useToast();
    const { auth } = usePage<PageProps>().props;
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleAddUser = () => {
        if (
            !email ||
            auth.organizationLogged.users.some(
                (user) => user.email === email
            ) ||
            users.some((user) => user.email === email)
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
            { email },
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
                onError: (errors) => console.error(errors),
            }
        );
    };

    const handleRemoveUser = (email: string) =>
        setUsers(users.filter((user) => user.email !== email));

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route('organizations.invite'),
            { users: users.map((user) => user.email) },
            {
                preserveScroll: true,
                onSuccess: ({ props: { flash } }) => {
                    setUsers([]);
                    toast({
                        title: 'Succès',
                        description: flash.success,
                    });
                },
                onError: (errors) => console.error(errors),
            }
        );
    };

    const handleRoleChange = (userId: number, role: string) => {
        router.post(
            route('organizations.settings.update.role'),
            { userId, role },
            {
                preserveScroll: true,
                onSuccess: ({ props: { flash } }) => {
                    toast({
                        title: 'Succès',
                        description: flash.success,
                    });
                },
                onError: (errors) => console.error(errors),
            }
        );
    };

    const handleDeleteUser = (email: string) => {
        router.delete(route('organizations.delete.user', { email }), {
            preserveScroll: true,
            onSuccess: ({ props: { flash } }) => {
                toast({
                    title: 'Succès',
                    description: flash.success,
                });
            },
            onError: (errors) => {
                toast({
                    title: 'Erreur',
                    description: errors[0],
                });
            },
        });
    };

    return (
        <OrganizationSettingsLayout>
            <FormSection
                title="Gérer les membres"
                description="Vous pouvez ajouter des collaborateurs à votre organisation en entrant leur adresse e-mail ci-dessous."
                disabled={!users.length}
            >
                <ul role="list" className="divide-y divide-gray-100">
                    {auth.organizationLogged.users.map((user) => (
                        <UserListItem
                            key={user.email}
                            user={user}
                            handleRoleChange={handleRoleChange}
                            handleDeleteUser={handleDeleteUser}
                        />
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
                        type="button"
                        onClick={handleAddUser}
                        size="icon"
                        className="rounded-full shrink-0"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </Button>
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <ul role="list" className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <InvitedUserListItem
                            key={user.email}
                            user={user}
                            handleRemoveUser={handleRemoveUser}
                        />
                    ))}
                </ul>
            </FormSection>
        </OrganizationSettingsLayout>
    );
};

export default View;
