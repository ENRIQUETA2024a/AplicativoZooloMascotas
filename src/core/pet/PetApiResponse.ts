// Interface que define la estructura del Model y de los DATOS QUE ENTRAN DE LA API
export interface PetAPIResponse {
    birth_date:    Date;
    breed:         string;
    color:         string;
    created_at:    Date;
    deleted_at:    Date;
    gender:        string;
    id:            number;
    medical_notes: string;
    name:          string;
    owner_id:      number;
    photo:         string;
    specie:        string;
    updated_at:    Date;
    weight:        string;
}
