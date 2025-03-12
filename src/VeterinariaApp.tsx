import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import { NavigationContainer} from "@react-navigation/native";
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import {LoginProvider} from "./presentation/providers/LoginProvider";
import MyDrawerNavigator from "./presentation/navigation/MyDrawerNavigator";
import * as eva from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {useAuth} from "./presentation/components/hooks/useAuth";
import {MyActivityIndicator} from "./presentation/components/ui/MyActivityIndicator";

export const VeterinariaApp = () => {

    const {isAuthenticated, isLoading} =useAuth();

    useEffect(() => {
        console.log('isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);
    }, [isLoading, isAuthenticated]);

    if (isLoading) {
        return (
            <MyActivityIndicator />
        );
    }
    console.log('Renderizando contenido principal,s isAuthenticated:', isAuthenticated);
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <LoginProvider>
                        <MyDrawerNavigator />
                    </LoginProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
}
