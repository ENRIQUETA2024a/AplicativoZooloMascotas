// ################ AVANZAR

/*
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { apiZooloMascotas } from "../../config/api/apiZooloMascotas";
import { Owner, User, OwnerApiMapper, UserApiMapper } from "../../core";

type LoginStatus = "authenticated" | "unauthenticated" | "loading";
type UserType = "owner" | "user";

interface AuthState {
    status: LoginStatus;
    user?: Owner | User;
    userType?: UserType;
    login: (email: string, password: string, type: UserType) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: "loading",
    user: undefined,
    userType: undefined,

    login: async (email: string, password: string, type: UserType) => {
        const endpoint = type === "owner" ? "/login-app" : "/user-app";
        const tokenKey = type === "owner" ? "ownerAuthToken" : "userAuthToken";

        try {
            const { data } = await apiZooloMascotas.post(endpoint, { email, password });
            const { userToken, userAccessed } =
                type === "owner" ? OwnerApiMapper(data) : UserApiMapper(data);

            if (userAccessed) {
                await SecureStore.setItemAsync(tokenKey, userToken);
                apiZooloMascotas.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

                set({ status: "authenticated", user: userAccessed, userType: type });
                console.log("✅ Login Exitoso:", get().status);
                return true;
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Credenciales incorrectas");
        }

        set({ status: "unauthenticated", user: undefined, userType: undefined });
        return false;
    },

    checkAuth: async () => {
        const ownerToken = await SecureStore.getItemAsync("ownerAuthToken");
        const userToken = await SecureStore.getItemAsync("userAuthToken");

        if (ownerToken || userToken) {
            const token = ownerToken || userToken;
            apiZooloMascotas.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            set({ status: "authenticated", userType: ownerToken ? "owner" : "user" });
        } else {
            set({ status: "unauthenticated" });
        }
    },

    logout: async () => {
        await SecureStore.deleteItemAsync("ownerAuthToken");
        await SecureStore.deleteItemAsync("userAuthToken");
        apiZooloMascotas.defaults.headers.common["Authorization"] = "";
        set({ status: "unauthenticated", user: undefined, userType: undefined });
    }
}));


Login de Dueño (Owner)
const { login } = useAuthStore();
await login(email, password, "owner");



Login de Usuari
const { login } = useAuthStore();
await login(email, password, "user");

CERRAR SESION
const { logout } = useAuthStore();
logout();

 */