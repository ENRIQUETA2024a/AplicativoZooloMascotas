// interfaz de la respuesta API (DTO = Data Transfer Object)

export interface UserApiResponse {
    token: string; ////Se agrega para la respuesta del API para obtener el TOKEN
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at?: string | null;
        surname?: string;
        avatar?: string;
        phone?: string;
        type_document?: string
        n_document?: string;
        gender: string;
    };
    role: string;
}

export interface UserDashboardApiResponse {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role_id: number;
    avatar: string;
    created_at: string;
    role: RoleApiResponse;
}

export interface RoleApiResponse {
    id: number;
    name: string;
}

export interface UserListApiResponse{
    users: UserDashboardApiResponse[]
}