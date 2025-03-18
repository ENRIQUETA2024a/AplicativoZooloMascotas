import {getAuthToken} from "./userLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {UserApiMapperForDashboard, UserDashboard,  UserListApiResponse} from "../../core";


export const getUsersForSuperAdmin = async ():Promise<UserDashboard[]> => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token, userType} = await getAuthToken();
        if (userType !== "owner" && !token) {
            console.warn("No hay token disponible o el usuario no es un Dueño");
            return []; //  Devolvemos un array vacío para evitar que la app se rompa
        }
        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }
        //Realizamos la solicitud
        const {data} = await apiZooloMascotas.get<UserListApiResponse>('/dash-users', config);

         const users= data.users.map((users) => (UserApiMapperForDashboard(users)))
         return users;
    } catch (error) {
        console.error(`❌ Error obteniendo los usuarios getUsersForSuperAdmin: `, error);
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