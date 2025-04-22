import {getAuthToken} from "../user/userLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {PetApiMapperDashboard, PetApiResponseDashboard, PetDashboard} from "../../core";


const BASE_URL = 'admin/pets/';

export const getPets = async (): Promise<PetDashboard[]> => {

    try {
        const {token, userType} = await getAuthToken();
        if (!token && userType !== "owner") {
            console.warn("⚠️ No hay token disponible o usuario sin permisos");
            return [];
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        };

        const {data} = await apiZooloMascotas.get<PetApiResponseDashboard>(BASE_URL, config);
        return PetApiMapperDashboard.mapPetApiResponseToModel(data);
    } catch (error) {
        console.warn (`❌ Error obteniendo las mascotas getPets: `, error);
        if (error.response) {
            console.warn ("📌 Código de estado:", error.response.status);
            console.warn ("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn ("📌 Error general:", error.message);
        }
        return [];
    }
}

// Obtener un Pet por ID
export const  getPetById = async (id: number): Promise<PetDashboard | null> => {
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
        console.warn(`❌ Error obteniendo las mascotas getPetById: `, error);
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        return null;
    }
};

// Actualizar Pet
export const updatePet = async (id: number, petData: any): Promise<boolean> => {
    try {
        const {token, userType} = await getAuthToken();
        if (!token && userType !== "owner") {
            console.warn("⚠️ No hay token disponible");
            return false;
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        };

        await apiZooloMascotas.put(`${BASE_URL}${id}`, petData, config);
        return true;
    } catch (error) {
        console.warn(`❌ Error obteniendo actualizando mascota updatePet: `, error);
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        return false;
    }
};


// Eliminar un dueño (soft delete)
export const deletePet = async (id: number): Promise<boolean> => {
    try {
        const {token} = await getAuthToken();
        if (!token) {
            console.warn("No hay token disponible");
            return false;
        }
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        };
        const {data} = await apiZooloMascotas.delete(`${BASE_URL}${id}`, config);
        return true;
    } catch (error) {
        console.warn(`❌ Error eliminando la mascota deletePet: `, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        return false;
    }
};


//Activar o Desactivar
export const toggleActivatePet = async (id: number, isActive: boolean): Promise<boolean> => {
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
        console.log(`✅ Mascota con ID ${id} ${isActive ? "desactivado" : "activado"} correctamente`);
        return true;
    } catch (error) {
        console.warn(`❌ Error cambiando estado del dueño con ID ${id}: `, error);
        return false;
    }
}


export const searchPets = async (searchQuery: string): Promise<PetDashboard []> => {
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

        // Llamamos al endpoint de toggleActive
        const {data} = await apiZooloMascotas.get(`${BASE_URL}search?query=${searchQuery}`, config);
        return PetApiMapperDashboard.mapPetApiResponseToModel(data);

    } catch (error) {
        console.warn(`❌ Error obteniendo las mascotas searchQuery en searchPets: `, error);
        if (error.response) {
            console.warn("📌 Código de estado:", error.response.status);
            console.warn("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.warn("📌 Error general:", error.message);
        }
        return [];
    }
}
