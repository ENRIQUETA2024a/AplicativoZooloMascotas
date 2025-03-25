
export interface Pet{
    id: number;
    specie: string;
    name: string;
    breed: string;
    birthDate: string;
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