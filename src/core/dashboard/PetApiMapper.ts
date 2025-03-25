import {PetApiResponse} from "./PetApiResponse";
import {Pet} from "./Pet";

export class PetApiMapper {
    static mapPetApiResponseToModel(petApi: PetApiResponse): Pet[]{
        return petApi.data.map( pet=>({
            id: pet.id,
            specie: pet.specie,
            name: pet.name,
            breed: pet.breed,
            birthDate: pet.birthDate,
            gender: pet.gender,
            color: pet.color,
            weight: pet.weight,
            photo: pet.photo,
            medicalNotes: pet.medicalNotes,
            ownerId: pet.ownerId,
            deletedAt: pet.deletedAt,
            owner: pet.owner,
            phone: pet.phone
        }) )
    }
    static mapPetModelToApiResponse(pet: Pet) {
        return {
            id: pet.id,
            specie: pet.specie,
            name: pet.name,
            breed: pet.breed,
            birthDate: pet.birthDate,
            gender: pet.gender,
            color: pet.color,
            weight: pet.weight,
            photo: pet.photo,
            medicalNotes: pet.medicalNotes,
            ownerId: pet.ownerId,
            deletedAt: pet.deletedAt,
            owner: pet.owner,
            phone: pet.phone
        }
    }
}