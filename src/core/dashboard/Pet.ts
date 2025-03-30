
export interface Pet{
    id: number;
    specie: string;
    name: string;
    breed: string;
    birth_date: Date | null;
    gender: string;
    color: string;
    weight: string;
    photo: string;
    medicalNotes: string;
    ownerId: number;
    deletedAt: string | null;
    owner: string;
    phone: string | null;
}

export interface PetFormI{
    specie: string;
    name: string;
    breed: string;
    birth_date: Date | null;
    gender: string;
    color: string;
    weight: string;
    photo: string;
    medicalNotes: string;
}