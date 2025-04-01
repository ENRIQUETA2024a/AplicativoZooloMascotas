import {PetApiResponseDashboard} from "./PetApiResponseDashboard";
import {PetDashboard} from "./PetDashboard";

export class PetApiMapperDashboard {
    static mapPetApiResponseToModel(petApi: PetApiResponseDashboard): PetDashboard[]{
        return petApi.data.map( pet=>({
            id: pet.id,
            specie: pet.specie,
            name: pet.name,
            breed: pet.breed,
            birth_date: pet.birth_date,
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
    static mapPetModelToApiResponse(pet: PetDashboard) {
        return {
            id: pet.id,
            specie: pet.specie,
            name: pet.name,
            breed: pet.breed,
            birth_date: pet.birth_date,
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