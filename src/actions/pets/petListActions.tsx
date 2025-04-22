import {Pet} from "../../core/pet/Pet";
//import {getAuthToken} from "../owners/ownerLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {getAuthToken} from "../user/userLoginActions";
import {PetApiMapper} from "../../core";


export const getPetById = async(petId:number):Promise<Pet | null> =>{
    try{
        //Obtenemos el token almacenado en secureStore
        const {token,userType} = await getAuthToken();
        if(userType!=="user"  && !token) {
            console.warn("No hay token disponible");
            return null; //  Retornamos para evitar que la app se rompa
        }

        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }

        const {data} = await apiZooloMascotas.get(`/pets/${petId}`,config);
        const pet = PetApiMapper.mapApiResponseToModel(data);        
        return pet;
    }
    catch (error) {
        console.warn (`❌ Error obteniendo las mascotas getPetById del Owner ID ${petId}:`, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.warn ("📌 Código de estado:", error.response.status);
            console.warn ("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn ("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app se rompa
        return null;
    }
}