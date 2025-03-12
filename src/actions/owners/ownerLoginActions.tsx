import {apiZooloMascotas} from '../../config/api/apiZooloMascotas'
import {Alert} from "react-native";
import * as SecureStore from "expo-secure-store";
import {Owner, OwnerApiResponse} from "../../core";

const returnOwnerAccessed = (data: OwnerApiResponse
) => {

    const token = data.token;
    const owner: Owner
        = {
        id: data.owner.id,
        names: data.owner.names,
        surnames: data.owner.surnames,
        type_document: data.owner.type_document,
        n_document: data.owner.n_document,
        email: data.owner.email,
        phone: data.owner.phone,
        address: data.owner.address,
        city: data.owner.city,
        emergency_contact: data.owner.emergency_contact,
    };
    return {
        ownerAccessed: owner,
        ownerToken: token,
    }
}

export const ownerLoginActions = async (email: string, password: string) => {
    try {
        const {data} = await apiZooloMascotas.post<OwnerApiResponse>("/login-app", {email, password});
        const {ownerToken,ownerAccessed} =returnOwnerAccessed(data);
        return ({ownerToken,ownerAccessed});
    } catch (error) {

        if (error.response) {
            // El backend respondió con un error (ej: 401, 404)
            Alert.alert("Error", error.response.data.message || "Credenciales incorrectas");
        } else {
            // Error de red o desconexión
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
        return null;
    }
}

// Obtener el token para realizar cualquier solicitud Authenticada
export const getAuthToken = async () => {
    try {
        const token = await SecureStore.getItemAsync("authToken");
        return token || null; // Retorna null si no hay token
    } catch (error) {
        console.error("❌ Error obteniendo el token:", error);
        return null; // Retorna null si hay un error
    }
}