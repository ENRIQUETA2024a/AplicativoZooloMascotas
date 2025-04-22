import {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {getAuthToken, useUserLoginStore} from "../../../actions";
// import {useOwnerLoginStore} from "../../../actions";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {user, userType, status, checkAuth,role} = useUserLoginStore();

    useEffect(() => {
        const checkToken = async () => {
            try {
                await checkAuth();//Verificamos la autenticacion con zustand
                const tokenKey = userType === "owner" ? "ownerAuthToken" : "userAuthToken";
                const {token} = await getAuthToken();
                if (user) {
                    if (token && status === "authenticated") {
                        console.log("✅ useAuth - Token Encontrado:", token)
                        console.log("✅ useAuth - userType Encontrado:", userType)
                        console.log("✅ useAuth - status Encontrado:", status)
                        setIsLoading(true);
                    } else {
                        await SecureStore.deleteItemAsync(tokenKey);
                        setIsAuthenticated(false)
                    }
                } else {
                    await SecureStore.deleteItemAsync(tokenKey);
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    console.log("❌ useAuth-token:", token)
                    console.log("❌ useAuth-userType:", userType)
                    console.log("❌ useAuth-status:", status)
                }

                // const token = await SecureStore.getItemAsync("authToken");
                // if (owner) {
                //     if (token && token.trim().length > 0) {
                //         console.log('Token válido encontrado:', token);
                //         setIsAuthenticated(true);
                //     } else {
                //         // Asegurar que se establezca en false si no hay token
                //         setIsLoading(false);
                //     }
                // } else {
                //     await SecureStore.deleteItemAsync("authToken");
                //     setIsAuthenticated(false);
                //     setIsLoading(false);
                // }
                //await SecureStore.deleteItemAsync("authToken"); #TODO para eliminar el LOGIN QUE SE TENIA

            } catch (error) {
                console.warn("❌ Error verificando el token:", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkToken();
    }, [user, userType, status,role]);

    return {isAuthenticated, isLoading};
};