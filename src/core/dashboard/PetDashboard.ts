
export interface PetDashboard{
    id: number;
    specie: string;
    name: string;
    breed: string;
    birth_date: string ;
    gender: string;
    color: string;
    weight: string;
    photo: string;
    // #Nuevo campo para la foto
    photoFile?:File | null;
    medical_notes: string;
    ownerId: number;
    deleted_at: string | null;
    owner: string;
    phone: string | null;
}

export interface PetFormI{
    specie: string;
    name: string;
    breed: string;
    birth_date: string;
    gender: string;
    color: string;
    weight: string;
    photo: string;
    //photoFile?: { uri: string; type: string; name: string } | null;
    medical_notes: string;
}