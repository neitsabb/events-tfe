export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type Event = {
    id: string;
    // category: string;
    status: "draft" | "published" | "archived" | "not_configured";
    name: string;
    isConfigured: boolean;
    tickets: {
        total: number;
        sold: number;
        admissions: Admission[];
        extras: Extra[];
    };
};

export type CoordsProps = {
    lat: number;
    lng: number;
};

export type Admission = {
    name: string;
    quantity: number;
    price: number;
};

export type Extra = Admission;
export interface ErrorsProps {
    [key: string]: string;
}
export interface StepsFields {
    location: string;
    start_date: Date | undefined;
    end_date: Date | undefined;
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
    };
};
