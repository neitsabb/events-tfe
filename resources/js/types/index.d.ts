export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Event {
    id: number;
    name: string;
    description: string;
    category: string;
    tickets: {
        total: number;
        sold: number;
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
