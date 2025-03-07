import {PropsWithChildren, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {MyRootStackScreens} from "../navigation/ScreenNavigations";
import {useLoginStore} from "../../actions/owners/login.state";
import * as SplashScreen from "expo-splash-screen";
import {ActivityIndicator, View} from "react-native";

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
                SplashScreen.hideAsync(); // Ocultamos el SplashScreen
            }
        }
        initAuth();
        //Verificamos si hay una sesion activa al iniciar el aplicativo
    }, []);


    useEffect(() => {
        if (!appReady || status === "loading") return; //Esperamos hasta que el estado este definido
        navigation.reset({
            index: 0,
            routes: [{name: status === 'authenticated' ? "HomeScreen" : 'LoginScreen'}],
        })
        SplashScreen.hideAsync(); // Ocultamos el SplashScreen
    }, [status,appReady]);

    if(!appReady){
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#10d5eb" />
            </View>
        );
    }

    return <>{children}</>;
};
