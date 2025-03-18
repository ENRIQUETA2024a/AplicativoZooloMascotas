import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {Appointment, AppointmentApiMapper} from "../../core";
import {getAuthToken} from "../user/userLoginActions";


export const getAppointmentsByPetId = async (petId: number): Promise<Appointment[]> => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token} = await getAuthToken();
        if (!token) {
            console.warn("No hay token disponible");
            return null; //  Retornamos para evitar que la app se rompa
        }
        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }
        const {data} = await apiZooloMascotas.get(`/pets/${petId}/appointments`, config);
        const appointments = data.map((appoint) => (AppointmentApiMapper.mapApiResponseToModel(appoint)))
        return appointments;
    } catch (error) {
        console.error(`❌ Error obteniendo las citas del Pet ID ${petId}:`, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.error("📌 Código de estado:", error.response.status);
            console.error("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.error("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app no se rompa
        return [];
    }
}