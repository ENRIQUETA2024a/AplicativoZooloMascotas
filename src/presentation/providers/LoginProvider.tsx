import React, {PropsWithChildren, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {MyRootStackScreens} from "../navigation/MyRootStackScreens";
import {useLoginStore} from "../../actions/owners/ownerLoginState";
import * as SplashScreen from "expo-splash-screen";
import {MyActivityIndicator} from "../components/ui/MyActivityIndicator";

SplashScreen.preventAutoHideAsync(); // Mantener el splash hasta que la app esté lista

export const LoginProvider = ({children}: PropsWithChildren) => {
    const navigation = useNavigation<StackNavigationProp<MyRootStackScreens>>();
    const {status, checkAuth} = useLoginStore();
    const [appReady, setAppReady] = useState(false);


    useEffect(() => {
        const initAuth = async () => {
            try {
                await checkAuth(); // Verificamos la autenticación
            } catch (error) {
                console.error("Error en la autenticación:", error);
            } finally {
                setAppReady(true);
            }
        };
        initAuth();
    }, []);


    useEffect(() => {
        if (!appReady || status === "loading") return; // Esperar hasta que la app esté lista
        navigation.reset({
            index: 0,
            routes: [{name: status === "authenticated" ? "OwnerHomeScreen" : "LoginScreen"}],
        });
        SplashScreen.hideAsync(); // Ocultamos el SplashScreen solo cuando ya se tomó una decisión
    }, [status, appReady]);

    if (!appReady || status === "loading") {
        return (
            <MyActivityIndicator/>
        );
    }

    return <>{children}</>;
};
