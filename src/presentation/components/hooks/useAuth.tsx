import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {useOwnerLoginStore} from "../../../actions";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const  { owner,status } = useOwnerLoginStore();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await SecureStore.getItemAsync("authToken");
                if(owner){
                    if (token && token.trim().length > 0) {
                        console.log('Token válido encontrado:', token);
                        setIsAuthenticated(true);
                    }
                    else
                    {
                        // Asegurar que se establezca en false si no hay token
                        setIsLoading(false);
                    }
                }
                else{
                    await SecureStore.deleteItemAsync("authToken");
                    setIsAuthenticated(false);
                    setIsLoading(false);
                }
                //await SecureStore.deleteItemAsync("authToken"); #TODO para eliminar el LOGIN QUE SE TENIA

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