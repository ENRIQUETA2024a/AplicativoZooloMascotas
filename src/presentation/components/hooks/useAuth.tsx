import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                //await SecureStore.deleteItemAsync("authToken"); #TODO para eliminar el LOGIN QUE SE TENIA
                console.log('Verificando token...');
                const token = await SecureStore.getItemAsync("authToken");
                if (token && token.trim().length > 0) {
                    console.log('Token válido encontrado:', token);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error verificando el token:", error);
                setIsAuthenticated(false);
            }finally {
                setIsLoading(false);
            }
        };

        checkToken();
    }, []);

    return { isAuthenticated, isLoading };
};