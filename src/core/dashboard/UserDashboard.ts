export interface UserDashboard{
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role_id: number;
    avatar: string;
    created_at: string;
    deleted_at: string | null;
    role: Role;
}

export interface Role{
    id?:number;
    name?:string;
}

export interface UserFormI{
    name:string;
    surname:string;
    email:string;
    phone:string;
    role_id:number;
}