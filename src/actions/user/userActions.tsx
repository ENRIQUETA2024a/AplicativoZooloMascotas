import {getAuthToken} from "./userLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {UserApiMapperForDashboard, UserDashboardApiResponse, UserListApiResponse} from "../../core";
import {UserDashboard} from "../../core/dashboard/UserDashboard";
import {UserApiMapperDashboard} from "../../core/dashboard/UserApiMapperDashboard";

const BASE_URL = 'users/';

export const getUsersForSuperAdmin = async (): Promise<UserDashboard[]> => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token, userType} = await getAuthToken();
        if (userType !== "owner" && !token) {
            console.warn("No hay token disponible");
            return []; //  Devolvemos un array vacío para evitar que la app se rompa
        }
        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }
        //Realizamos la solicitud
        const {data} = await apiZooloMascotas.get<UserListApiResponse>(BASE_URL, config);
        return data.users.map((users) => (UserApiMapperForDashboard(users)));
    } catch (error) {
        console.warn(`❌ Error obteniendo los usuarios getUsersForSuperAdmin: `, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app no se rompa
        return [];
    }
}

// Obtener un Usuario por ID
export const getUserById = async (id: number): Promise<UserDashboard | null> => {
    try {
        const {token, userType} = await getAuthToken();
        if (!token && userType !== "owner") {
            console.warn("⚠️ No hay token disponible");
            return null;
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        };

        const {data} = await apiZooloMascotas.get(`${BASE_URL}${id}`, config);
        return data;

    } catch (error) {
        console.warn(`❌ Error obteniendo los usuarios getUserById: `, error);
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        return null;
    }
};

export const updateUser = async (id: number, updatedData: any) => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token, userType} = await getAuthToken();
        if (userType !== "owner" && !token) {
            console.warn("No hay token disponible");
            return null; //  Devolvemos un array vacío para evitar que la app se rompa
        }
        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }
        //Realizamos la solicitud
        const {data} = await apiZooloMascotas.put<UserDashboardApiResponse>(`${BASE_URL}${id}`, updatedData, config);

        return data;

    } catch (error) {
        console.warn(`❌ Error actualizando los usuarios updateUser: `, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app no se rompa
        return null;
    }
}

export const deleteUser = async (id: number) => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token, userType} = await getAuthToken();
        if (userType !== "owner" && !token) {
            console.warn("No hay token disponible");
            return []; //  Devolvemos un array vacío para evitar que la app se rompa
        }
        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }
        //Realizamos la solicitud
        const {data} = await apiZooloMascotas.delete<UserDashboardApiResponse>(`${BASE_URL}${id}`, config);
        return data;
    } catch (error) {
        console.warn(`❌ Error eliminando el usuario destroyUser: `, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app no se rompa
        return [];
    }
}

//Activar o Desactivar
export const toggleActivateUser = async (id: number, isActive: boolean): Promise<boolean> => {
    try {
        const {token} = await getAuthToken();
        if (!token) {
            console.warn("⚠️ No hay token disponible");
            return false;
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        };

        // Llamamos al endpoint de toggleActive
        await apiZooloMascotas.put(`${BASE_URL}toggle-active/${id}`, {}, config);
        return true;
    } catch (error) {
        console.warn(`❌ Error cambiando estado del Usuario con ID ${id}: `, error);
        return false;
    }
}

export const searchUsers = async (searchQuery: string): Promise<UserDashboard []> => {
    try {
        const {token} = await getAuthToken();
        if (!token) {
            console.warn("⚠️ No hay token disponible");
            return [];
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        };

        const {data} = await apiZooloMascotas.get(`${BASE_URL}search?query=${searchQuery}`, config);
        return UserApiMapperDashboard.mapUserApiResponseToModel(data);

    } catch (error) {
        console.warn(`❌ Error obteniendo los usuarios searchUsers en searchUsers: `, error);
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        return [];
    }
}