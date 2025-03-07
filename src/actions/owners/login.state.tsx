import {OwnerModel} from "../../domain/models/OwnerModel";
import {create} from "zustand";
import {ownerLogin} from "./owner.login";

type LoginStatus = "authenticated" | "unauthenticated" | "loading";
import * as SecureStore from "expo-secure-store";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";

// TODO creamos interface para manejar propiedades del login
export interface OwnerLoginState {
    status: LoginStatus;
    owner?: OwnerModel;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>; // Funcion para verificar la autenticacion
}

export const useLoginStore = create<OwnerLoginState>()((set, get) => ({
    status: "loading", //Estado inicial
    owner: undefined,//No hay dueño autenticado
    login: async (email: string, password: string) => {
        const respuesta = await ownerLogin(email, password);
        //
        if (!respuesta) {
            set({status: "unauthenticated", owner: undefined});
            return false;
        }
        set({status: "authenticated", owner: respuesta});
        return true;
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
        console.log("Cerrando Sesion");
    }
}))