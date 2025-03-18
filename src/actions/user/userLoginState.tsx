import {Owner, OwnerApiMapper, User, UserApiMapper, UserApiResponse} from "../../core";
import {create} from "zustand/index";
import * as SecureStore from "expo-secure-store";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {Alert} from "react-native";
import {getAuthToken} from "./userLoginActions";
import {LoginStatus, UserRole, UserType} from "./userLoginTypes";

export interface AuthState {
    status: LoginStatus;
    user?: Owner | User;
    userType?: UserType;
    role?: UserRole;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>; // Funcion para ver
}

export const useUserLoginStore = create<AuthState>()((set, get) => ({
    status: "loading", //Estado inicial
    user: undefined,//No hay user autenticado
    userType: undefined, //Aun Sin tipo de usuario
    role: undefined, // Inicializamos sin rol

    login: async (email: string, password: string) => {
        const loginAttempts: { type: UserType; endpoint: string; tokenKey: string }[] = [
            { type: "owner", endpoint: "/owner-login-app", tokenKey: "ownerAuthToken" },
            { type: "user", endpoint: "/user-login-app", tokenKey: "userAuthToken" },
        ];

        for (const attempt of loginAttempts) {
            try {
                const { data } = await apiZooloMascotas.post(attempt.endpoint, { email, password });
                const { userToken, userAccessed, userRole } = attempt.type === "owner" ? OwnerApiMapper(data) : UserApiMapper(data);

                if (userAccessed) {
                    await SecureStore.setItemAsync(attempt.tokenKey, userToken);
                    apiZooloMascotas.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
                    set({ status: "authenticated", user: userAccessed, userType: attempt.type,role: userRole });
                    console.log(`✅ Login exitoso como ${attempt.type} Rol: ${userRole}` );
                    return true;
                }
            } catch (error) {
                console.warn(`⚠️ Falló el intento de login como ${attempt.type}`);
            }
        }

        Alert.alert("Error", "Credenciales incorrectas");
        set({ status: "unauthenticated", user: undefined, userType: undefined });
        return false;
    },
    checkAuth: async () => {
        const ownerToken = await SecureStore.getItemAsync("ownerAuthToken");
        const userToken = await SecureStore.getItemAsync("userAuthToken");

        if (ownerToken || userToken) {
            const token = ownerToken || userToken
            apiZooloMascotas.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            set({status: "authenticated", userType: ownerToken ? "owner" : "user"});
        } else {
            set({status: "unauthenticated"});
        }
    },
    logout: async () => {
        await SecureStore.deleteItemAsync("ownerAuthToken");
        await SecureStore.deleteItemAsync("userAuthToken");
        const {token, userType} = await getAuthToken();
        apiZooloMascotas.defaults.headers.common["Authorization"] = "";
        set({status: "unauthenticated", user: undefined, userType: undefined});
        console.log("❌ Estado al LOGOUT: ", get().status)
        console.log("❌ Token Generado: ", token)
        console.log("❌ Usuario Logeado: ", userType)
    }
}))

