import { EventStatus } from './enums';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
}

export type Event = {
    id: string;
    slug?: string;
    image?: string;
    description?: string;
    coords: CoordsProps;
    // category: string;
    start_date?: string;
    end_date?: string;
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
        flash: {
            user: User;
        };
    };
};

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
