import {apiZooloMascotas} from '../../config/api/apiZooloMascotas'
import {OwnerResponse} from "../../infraestructure/interfaces/owner.response";
import {OwnerModel} from "../../domain/models/OwnerModel";
import {Alert} from "react-native";
import * as SecureStore from "expo-secure-store";

const returnOwnerAccessed = (data: OwnerResponse) => {

    const token = data.token;
    const owner: OwnerModel = {
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

export const ownerLogin = async (email: string, password: string) => {
    try {
        const {data} = await apiZooloMascotas.post<OwnerResponse>("/login-app", {email, password});
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
    return await SecureStore.getItemAsync("authToken");
}