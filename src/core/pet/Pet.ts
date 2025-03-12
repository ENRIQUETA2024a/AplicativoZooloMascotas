//Model que la app usa internamente, basado en una interfaz (PetApiResponse)
export interface Pet {
    birth_date:    string;
    breed:         string;
    color:         string;
    gender:        string;
    id:            number;
    medical_notes: string;
    name:          string;
    photo:         string;
    specie:        string;
    weight:        string;
    owner_id:      number;
}
