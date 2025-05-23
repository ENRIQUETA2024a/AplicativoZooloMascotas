import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {Pet} from "../../core/pet/Pet";
import {PetApiMapper, PetAPIResponse} from "../../core";
import {getAuthToken} from "../user/userLoginActions";


export const getOwnerPets = async (ownerId: number): Promise<Pet[]> => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token, userType} = await getAuthToken();
        if (userType !== "user" && !token) {
            console.warn("No hay token disponible o el usuario no es un Dueño");
            return []; //  Devolvemos un array vacío para evitar que la app se rompa
        }

        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }

        //Realizamos la solicitud
        const {data} = await apiZooloMascotas.get<PetAPIResponse[]>(`/owners/${ownerId}/pets`, config);
        return data.map((petRpta) => (PetApiMapper.mapApiResponseToModel(petRpta)));
    } catch (error) {
        console.warn (`❌ Error obteniendo las mascotas del Owner ID ${ownerId}:`, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.warn ("📌 Código de estado:", error.response.status);
            console.warn ("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn ("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app se rompa
        return [];
    }
}