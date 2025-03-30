import {getAuthToken} from "../user/userLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";

import {OwnerApiResponse} from "../../core/dashboard/OwnerApiResponse";
import {OwnerApiMapperDashboard, OwnerDashboard} from "../../core";


const BASE_URL = 'admin/owners/';

// Obtener todos los dueños
export const getOwners = async (): Promise<OwnerDashboard []> => {
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

        const {data} = await apiZooloMascotas.get<OwnerApiResponse>(BASE_URL, config);
        return OwnerApiMapperDashboard.mapOwnerApiResponseToModel(data);
    } catch (error) {
        console.error(`❌ Error obteniendo los dueños: `, error);
        if (error.response) {
            console.error("📌 Código de estado:", error.response.status);
            console.error("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.error("📌 Error general:", error.message);
        }
        return [];
    }
};

// Obtener un dueño por ID
export const getOwnerById = async (id: number): Promise<OwnerDashboard | null> => {
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
        return data.data;

    } catch (error) {
        console.error(`❌ Error obteniendo el dueño con ID ${id}: `, error);
        return null;
    }
};

// Crear un dueño
export const createOwner = async (ownerData: any): Promise<boolean> => {
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

        const message = await apiZooloMascotas.post<{ message: String; status: Number }>(BASE_URL, ownerData, config);
        return true;
    } catch (error) {
        console.error(`❌ Error creando dueño: `, error);
        return false;
    }
};

// Actualizar un dueño
export const updateOwner = async (id: number, ownerData: any): Promise<boolean> => {
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

        await apiZooloMascotas.put(`${BASE_URL}${id}`, ownerData, config);
        return true;
    } catch (error) {
        console.error(`❌ Error actualizando dueño con ID ${id}: `, error);
        return false;
    }
};

// Eliminar un dueño (soft delete)
export const deleteOwner = async (id: number): Promise<boolean> => {
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
        console.error(`❌ Error eliminando el dueño deleteOwner: `, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.error("📌 Código de estado:", error.response.status);
            console.error("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.error("📌 Error general:", error.message);
        }
        return false;
    }
};

//Activar o Desactivar
export const toggleActivateOwner = async (id: number, isActive: boolean): Promise<boolean> => {
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

        console.log(`✅ Dueño con ID ${id} ${isActive ? "desactivado" : "activado"} correctamente`);
        return true;
    } catch (error) {
        console.error(`❌ Error cambiando estado del dueño con ID ${id}: `, error);
        return false;
    }
}


export const searchOwners = async (searchQuery: string): Promise<OwnerDashboard []> => {
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
        return OwnerApiMapperDashboard.mapOwnerApiResponseToModel(data);

    } catch (error) {
        console.error(`❌ Error obteniendo los dueños searchQuery en searchOwners: `, error);
        if (error.response) {
            console.error("📌 Código de estado:", error.response.status);
            console.error("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.error("📌 Error general:", error.message);
        }
        return [];
    }
}
