import * as SecureStore from "expo-secure-store";
import {urlHealth} from "../../config/api/apiZooloMascotas";

// Obtener el token según el usuario autenticado
export const getAuthToken = async (): Promise<{ token: string | null; userType: "owner" | "user" | null }> => {
    try {
        const ownerToken = await SecureStore.getItemAsync("ownerAuthToken");
        const userToken = await SecureStore.getItemAsync("userAuthToken");

        if (ownerToken) {
            return { token: ownerToken, userType: "owner" };
        } else if (userToken) {
            return { token: userToken, userType: "user" };
        }
        return { token: null, userType: null };
    } catch (error) {
        console.error("❌ Error obteniendo el token:", error);
        return { token: null, userType: null };
    }
};
export const checkBackendHealth = async (timeout = 5000): Promise<boolean> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(urlHealth, { signal: controller.signal });
        clearTimeout(timeoutId);

        const data = await response.json();
        return response.ok && data?.status === "ok";
    } catch (error) {
        clearTimeout(timeoutId);
        //console.error("❌ Error al verificar el backend:", error.message);
        return false;
    }
};
