// interfaz de la respuesta API (DTO = Data Transfer Object)
export interface OwnerApiResponse {
    token: string; //Se agrega para la respuesta del API para obtener el TOKEN
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