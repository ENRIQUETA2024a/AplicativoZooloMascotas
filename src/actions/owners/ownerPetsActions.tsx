import {getAuthToken} from "./ownerLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {PetAPIResponse} from "../../core/pet/PetApiResponse";
import {PetApiMapper} from "../../core/pet/PetApiMapper";
import {Pet} from "../../core/pet/Pet";


export const getOwnerPets = async (ownerId: number):Promise<Pet[]>=>{
    try{
        //Obtenemos el token almacenado en secureStore
        const token = getAuthToken();
        if(!token) throw new Error("No hay token disponible");

        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }

        //Realizamos la solicitud
        const {data } = await apiZooloMascotas.get<PetAPIResponse[]>(`/owners/${ownerId}/pets`, config);
        const pet = data.map(( petRpta) => (PetApiMapper.mapApiResponseToModel(petRpta) ))
        console.log(pet);
        return pet;
    }
    catch(error){
        console.error(`Owner ID ${ownerId} Error obteniendo las mascotas: `,error);
        console.log(error);
    }
}