import {getAuthToken} from "./ownerLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {Pet} from "../../core/pet/Pet";
import {PetApiMapper, PetAPIResponse} from "../../core";


export const getOwnerPets = async (ownerId: number):Promise<Pet[]>=>{
    try{
        //Obtenemos el token almacenado en secureStore
        const token = await getAuthToken();
        if(!token) {
            console.warn("No hay token disponible");
            return []; //  Devolvemos un array vacío para evitar que la app se rompa
            //throw new Error("No hay token disponible");
        }

        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }

        //Realizamos la solicitud
        const {data } = await apiZooloMascotas.get<PetAPIResponse[]>(`/owners/${ownerId}/pets`, config);

        //Mapateamos la repuesta de la API a nuestro modelo interno
        const pets = data.map(( petRpta) => (PetApiMapper.mapApiResponseToModel(petRpta) ))

        return pets;
    }
    catch(error){
        console.error(`❌ Error obteniendo las mascotas del Owner ID ${ownerId}:`, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.error("📌 Código de estado:", error.response.status);
            console.error("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.error("📌 Error general:", error.message);
        }


        //  Devolvemos un array vacío para evitar que la app se rompa
        return [];
    }
}