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


