import { Organization } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
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

export const OrganizationSwitcher = ({
  organizations,
  organizationLogged,
}: {
  organizations: Organization[];
  organizationLogged: Organization;
}) => {
  const [selectedOrganizationId, setSelectedOrganizationId] =
    React.useState<number>(organizationLogged?.id || organizations[0]?.id);

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
    setSelectedOrganizationId(organizationLogged?.id || organizations[0]?.id);
  }, [organizationLogged, organizations]);

  const handleSelect = (id: string) => {
    const selectedId = parseInt(id, 10);
    setSelectedOrganizationId(selectedId);
    setData('organizationId', selectedId);
    isHandle.current = true;
  };

  const selectedOrganization = organizations.find(
    (org) => org.id === selectedOrganizationId
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <Select
        value={selectedOrganizationId.toString()}
        onValueChange={handleSelect}
      >
        <SelectTrigger className="w-48 flex items-center gap-2 [&>span]:flex [&>span]:w-full  [&>span]:truncate [&>span]:gap-1">
          <SelectValue>{selectedOrganization?.name}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Organisations</SelectLabel>
            {organizations.map((organization) => (
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
            Créez une nouvelle organisation pour gérer vos événements.
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
  const [genres, setGenres] = useState<string[]>([]);
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
      onSuccess: () => {
        handleOpen(false);
        reset();
        router.reload();
      },
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Nom" id="name" className="col-span-2" errors={errors}>
            <Input
              id="name"
              value={data.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData('name', e.target.value)
              }
            />
          </Field>
          <Field label="Type" id="type" errors={errors}>
            <Select
              onValueChange={(value: string) => setData('type', value)}
              defaultValue={data.type}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="association">Association</SelectItem>
                <SelectItem value="entreprise">Entreprise</SelectItem>
                <SelectItem value="label">Label de musique</SelectItem>
                <SelectItem value="collectif">Collectif artistique</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
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
            &Eacute;crivez une brève description de votre organisation (Mission,
            style musical, histoire, etc.)
          </p>
        </Field>
        <Field
          label="Genres musicaux"
          id="genres"
          required={false}
          errors={errors}
        >
          <InputTags tags={genres} setTags={setGenres} />
          <p className="text-xs text-muted-foreground">
            Quels genres musicaux représentez-vous ou produisez-vous ? (Ex :
            Techno, House, Hip-Hop, Jazz, Rock)
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
        <Field label="Site web" id="website" required={false} errors={errors}>
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

const InputTags = ({
  tags,
  setTags,
  props,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInputValue('');
      const tag =
        inputValue.trim().charAt(0).toUpperCase() + inputValue.slice(1);
      if (tags.includes(tag)) return;
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
        {...props}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-muted-foreground/15"
            >
              {tag}
              <span
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="ml-1 cursor-pointer"
              >
                <Cross2Icon className="w-3" />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
