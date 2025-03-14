import {create} from "zustand";
import {getAuthToken} from "./ownerLoginActions";

type LoginStatus = "authenticated" | "unauthenticated" | "loading";
import * as SecureStore from "expo-secure-store";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {Owner, OwnerApiMapper, OwnerApiResponse} from "../../core";
import {Alert} from "react-native";

// TODO creamos interface para manejar propiedades del login
export interface OwnerLoginState {
    status: LoginStatus;
    owner?: Owner;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>; // Funcion para verificar la autenticacion
}

export const useOwnerLoginStore = create<OwnerLoginState>()((set, get) => ({
    status: "loading", //Estado inicial
    owner: undefined,//No hay dueño autenticado
    login: async (email: string, password: string) => {
        const {ownerToken, ownerAccessed} = await ownerLoginActions(email, password);
        //
        if (ownerAccessed) {
            //Guardamos el token de manera segura con SecureStore
            await SecureStore.setItemAsync("authToken", ownerToken);
            //Configuramos Axios con el token par futura solicitudes
            apiZooloMascotas.defaults.headers.common['Authorization'] = `Bearer ${ownerToken}`;
            //Actualizamos el estado
            set({status: "authenticated", owner: ownerAccessed});

            console.log("✅ Login Exitoso, nuevo estado ZUSTAND:", get().status); // Estado
            console.log("✅ Token Generado:", ownerToken); // Token
            return true;
        } else {
            set({status: "unauthenticated", owner: undefined});
            return false;
        }


    },
    checkAuth: async () => {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
            apiZooloMascotas.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            set({status: "authenticated"})
        } else {
            set({status: "unauthenticated"});
        }
    },
    logout: async () => {
        await SecureStore.deleteItemAsync("authToken"); // Eliminamos el token de Secure Store
        apiZooloMascotas.defaults.headers.common["Authorization"] = "";
        set({status: "unauthenticated", owner: undefined});
        console.log("❌ Estado al LOGOUT: ", get().status)
        console.log("❌ Token Generado: ", getAuthToken())
    }
}))


const ownerLoginActions = async (email: string, password: string) => {
    try {
        const {data} = await apiZooloMascotas.post<OwnerApiResponse>("/login-app", {email, password});
        const {ownerToken, ownerAccessed} = OwnerApiMapper(data);
        return ({ownerToken, ownerAccessed});
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
