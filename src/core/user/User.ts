export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string |null ;
    surname?: string;
    avatar?: string ;
    phone?: string ;
    type_document?: string
    n_document?: string;
    gender: string;
}