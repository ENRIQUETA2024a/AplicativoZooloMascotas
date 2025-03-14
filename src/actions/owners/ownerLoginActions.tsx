
// Obtener el token para realizar cualquier solicitud Authenticada
import * as SecureStore from "expo-secure-store";

export const getAuthToken = async () => {
    try {
        const token = await SecureStore.getItemAsync("authToken");
        return token || null; // Retorna null si no hay token
    } catch (error) {
        console.error("❌ Error obteniendo el token:", error);
        return null; // Retorna null si hay un error
    }
}