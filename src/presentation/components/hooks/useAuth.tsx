import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                console.log('Verificando token...');
                const token = await SecureStore.getItemAsync("authToken");
                console.log('Token encontrado:', token ? 'Sí' : 'No');
                if (token) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error verificando el token:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkToken();
    }, []);

    return { isAuthenticated, isLoading };
};