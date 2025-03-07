export interface OwnerResponse {
    token: string; //Se agregar a la respuesta del API para obtener el TOKEN
    owner:{
        id: number;
        names: string;
        surnames: string;
        type_document: string;
        n_document: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        emergency_contact: string;
    }
}