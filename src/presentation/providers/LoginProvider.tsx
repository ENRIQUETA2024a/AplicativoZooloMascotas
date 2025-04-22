import React, {PropsWithChildren, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {MyRootStackScreens} from "../navigation/MyRootStackScreens";
import * as SplashScreen from "expo-splash-screen";
import {checkBackendHealth, useUserLoginStore} from "../../actions";
import {MyActivityIndicator, MyOfflineScreen} from "../components";
import {navigationRef} from "./navigationRef";


SplashScreen.preventAutoHideAsync(); // Mantener el splash hasta que la app esté lista

export const LoginProvider = ({children}: PropsWithChildren) => {
    const navigation = useNavigation<StackNavigationProp<MyRootStackScreens>>();
    const {status, checkAuth, userType, role} = useUserLoginStore();
    const [appReady, setAppReady] = useState(false);
    const [backendOk, setBackendOk] = useState(true);


    useEffect(() => {
        const initAuth = async () => {
            try {

                const backendOK = await checkBackendHealth();
                setBackendOk(backendOK); // Actualizamos estado
                if (backendOK) {
                    await checkAuth(); // Solo si el backend está bien
                }
                //await checkAuth(); // Verificamos la autenticación
            } catch (error) {
                console.warn("❌ Error en la autenticación:", error);
            } finally {
                setAppReady(true);
            }
        };
        initAuth();
    }, []);


    useEffect(() => {
        if (!appReady || status === "loading") return; // Esperar hasta que la app esté lista

        if (status === "authenticated") {
            if (userType === "owner") {
                if (navigationRef.isReady())
                    navigation.reset({index: 0, routes: [{name: 'OwnerHomeScreen'}]})
            } else {
                const screenMap: Record<string, keyof MyRootStackScreens> = {
                    "Super-Admin": "SuperAdminScreen",
                    "Veterinario": "VeterinarioScreen",
                    "Asistente": "AsistenteScreen",
                    "Recepción": "RecepcionScreen",
                };

                const targetScreen = screenMap[role] || "LoginScreen"; // Si el rol es desconocido, redirige al login
                if (navigationRef.isReady()) {
                    navigation.reset({index: 0, routes: [{name: targetScreen}]});
                }
            }
        } else {
            if (navigationRef.isReady()) {
                navigation.reset({index: 0, routes: [{name: "LoginScreen"}]});
            }
        }
        SplashScreen.hideAsync(); // Ocultamos el SplashScreen solo cuando ya se tomó una decisión
    }, [status, appReady, userType, role]);

    if (!appReady) {
        return <MyActivityIndicator/>;
    }

    if (!backendOk) {
        return <MyOfflineScreen/>;
    }

    return <>{children}</>;
};
