import {Vaccine, VaccineApiMapper} from "../../core";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {getAuthToken} from "../user/userLoginActions";


export const getVaccinationsByPetId = async (petId: number): Promise<Vaccine[]> => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token, userType} = await getAuthToken();
        if (userType!== "user" && !token) {
            console.warn("No hay token disponible");
            return []; //  Retornamos para evitar que la app se rompa
        }
        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }
        const {data} = await apiZooloMascotas.get(`/pets/${petId}/vaccinations`, config);
        const vaccines = data.map((vacc) => (VaccineApiMapper.mapApiResponseToModel(vacc)))
        return vaccines;
    } catch (error) {
        console.warn (`❌ Error obteniendo las vacunas del Pet ID ${petId}:`, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.warn ("📌 Código de estado:", error.response.status);
            console.warn ("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn ("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app no se rompa
        return [];
    }
}