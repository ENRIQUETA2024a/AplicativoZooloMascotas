export interface User {
    id: number;
    names: string;
    email: string;
    email_verified_at?: string |null ;
    surnames?: string;
    avatar?: string ;
    phone?: string ;
    type_document?: string
    n_document?: string;
    //gender: string; COMO la respuesta de Owner no tiene gender lo dejamos asi
    address: string;
    city: string;
    emergency_contact: string;
}


export interface Role{
    id:number;
    name:string;
}

export interface UserDashboard{
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role_id: number;
    avatar: string;
    created_at: string;
    role: Role;
    deleted_at: string;
}