import { Organization } from '@/types';
import { AddressComponents } from '@/Components/Admin/Configure/Steps/LocationStep';
import { EventStatus } from './enums';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
    organizations: Organization[];
}

export type Event = {
    id: string;
    slug?: string;
    image?: string;
    description?: string;
    coords: CoordsProps;
    location: AddressComponents;
    // category: string;
    start_date: Date;
    end_date: Date;
    status: EventStatus;
    name: string;
    isConfigured: boolean;
    tickets: {
        total: number;
        sold: number;
        admissions: Admission[];
        extras: Extra[];
    };
    preferences?: {
        key: string;
        value: string | string[];
    }[];
    organization: Organization;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
};

export type CoordsProps = {
    lat: number;
    lng: number;
};

export type Admission = {
    id?: number;
    type?: 'admission';
    name: string;
    quantity: number;
    price: number;
    sold?: number;
};

export type Extra = {
    id?: number;
    type?: 'extra';
    name: string;
    quantity: number;
    price: number;
    sold?: number;
};

export type Artist = {
    id: number;
    slug: string;
    name: string;
    image: string;
};

export type Organization = {
    id: number;
    name: string;
    image: string;
    stripe_status: string;
    stripe_account_id: string;
    events_count?: number;
    users: User[];
};
export interface ErrorsProps {
    [key: string]: string;
}
export interface StepsFields {
    location: string;
    start_date: Date | undefined;
    end_date: Date | undefined;
    coords: CoordsProps;
    tickets: {
        name: string;
        quantity: number;
        price: number;
    }[];
    extras: {
        name: string;
        quantity: number;
        price: number;
    }[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
        organizationLogged: Organization;
        organizations: Organization[];
    };
    permissions: PermissionsProps;
    flash: {
        user?: User;
        success?: string;
    };
};

interface PermissionsProps {
    [key: string]: { [key: string]: boolean };
}

export interface EventProps {
    event: Event;
}

export interface EventsProps {
    events: Event[];
}

export interface BreadcrumbItem {
    title: string;
    url?: string;
}

export interface BreadcrumbsProps extends PageProps {
    breadcrumbs: BreadcrumbItem[];
}
