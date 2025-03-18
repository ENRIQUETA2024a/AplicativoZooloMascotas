import React, {PropsWithChildren, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {MyRootStackScreens} from "../navigation/MyRootStackScreens";
import * as SplashScreen from "expo-splash-screen";
import {MyActivityIndicator} from "../components/ui/MyActivityIndicator";
import {useUserLoginStore} from "../../actions";

SplashScreen.preventAutoHideAsync(); // Mantener el splash hasta que la app esté lista

export const LoginProvider = ({children}: PropsWithChildren) => {
    const navigation = useNavigation<StackNavigationProp<MyRootStackScreens>>();
    const {status, checkAuth, userType, role} = useUserLoginStore();
    const [appReady, setAppReady] = useState(false);


    useEffect(() => {
        const initAuth = async () => {
            try {
                await checkAuth(); // Verificamos la autenticación
            } catch (error) {
                console.error("❌ Error en la autenticación:", error);
            } finally {
                setAppReady(true);
            }
        };
        initAuth();
    }, []);


    useEffect(() => {
        if (!appReady || status === "loading") return; // Esperar hasta que la app esté lista

        if (status === "authenticated") {
            if (userType === "owner")
                navigation.reset({index: 0, routes: [{name: 'OwnerHomeScreen'}]})
            else {
                const screenMap: Record<string, keyof MyRootStackScreens> = {
                    "Super-Admin": "SuperAdminScreen",
                    "Veterinario": "VeterinarioScreen",
                    "Asistente": "AsistenteScreen",
                    "Recepción": "RecepcionScreen",
                };

                const targetScreen = screenMap[role] || "LoginScreen"; // Si el rol es desconocido, redirige al login
                navigation.reset({index: 0, routes: [{name: targetScreen}]});
            }
        } else {
            navigation.reset({index: 0, routes: [{name: "LoginScreen"}]});
        }
        // const targetScreen = status === "authenticated"
        //     ? userType === "owner" ? "OwnerHomeScreen" : "UserHomeScreen"
        //     : "LoginScreen";
        //
        // navigation.reset({
        //     index: 0,
        //     //routes: [{name: status === "authenticated" ? "OwnerHomeScreen" : "LoginScreen"}],
        //     routes: [{name: targetScreen}],
        // });

        SplashScreen.hideAsync(); // Ocultamos el SplashScreen solo cuando ya se tomó una decisión
    }, [status, appReady, userType, role]);

    if (!appReady || status === "loading") {
        return (
            <MyActivityIndicator/>
        );
    }

    return <>{children}</>;
};
