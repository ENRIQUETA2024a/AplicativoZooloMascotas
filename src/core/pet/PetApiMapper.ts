// Mapper toma datos externos de la API y ajustan para que encajen en el model
import {Pet} from "./Pet"; // Modelo
import {PetAPIResponse} from "./PetApiResponse"; // Modelo de respuesta que nos Enviara la API
import {Image} from "react-native"

export class PetApiMapper {
    // #TODO Convierte desde API "JSON" hacia Modelo "Clase", LEER datos de la API
    static mapApiResponseToModel(pet: PetAPIResponse): Pet {

        const defaultImage = Image.resolveAssetSource(require("../../assets/default_pet.jpg")).uri;

        return {
            birth_date: "",
            breed: pet.breed,
            color: pet.color,
            gender: pet.gender,
            id: pet.id,
            medical_notes: pet.medical_notes,
            name: pet.name,
            photo: pet.photo || defaultImage,
            specie: pet.specie,
            weight: pet.weight,
            owner_id: pet.owner_id,
        };
    }

    // #TODO Convierte desde Modelo "Clase" hacia API "JSON", ENVIAR datos a la API
    static mapModelToApiResponse(pet: Pet): PetAPIResponse {
        return {
            birth_date: new Date(Date.now()),   //pet.birth_date,
            breed: pet.breed,
            color: pet.color,
            gender: pet.gender,
            id: pet.id,
            medical_notes: pet.medical_notes,
            name: pet.name,
            photo: pet.photo,
            specie: pet.specie,
            weight: pet.weight,
            owner_id: pet.owner_id,
            created_at: new Date(Date.now()),
            deleted_at: new Date(Date.now()),
            updated_at: new Date(Date.now()),
        };
    }

}