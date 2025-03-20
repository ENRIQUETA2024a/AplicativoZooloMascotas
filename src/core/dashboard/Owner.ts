export interface Owner {
    id: number;
    names: string;
    surnames: string;
    type_document: string;
    n_document: string;
    email?: string;
    phone: string;
    address?: string;
    city?: string;
    emergency_contact?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}