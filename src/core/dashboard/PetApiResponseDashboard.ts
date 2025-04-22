export interface PetApiResponseDashboard{
    message: string;
    data: PetDashboardResponse[];
}


export interface PetDashboardResponse{
    id: number;
    specie: string;
    name: string;
    breed: string;
    birth_date: string ;
    gender: string;
    color: string;
    weight: string;
    avatar: string;
    // #Nuevo campo para la foto
    photoFile?:File | null;
    medical_notes: string;
    ownerId: number;
    deleted_at: string | null;
    owner: string;
    phone: string | null;
}