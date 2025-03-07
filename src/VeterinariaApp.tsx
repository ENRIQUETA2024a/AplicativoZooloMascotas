import 'react-native-gesture-handler';
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import {LoginProvider} from "./presentation/providers/LoginProvider";
import MyDrawerNavigator from "./presentation/navigation/MyDrawerNavigator";
import * as eva from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {ActivityIndicator, Text, View} from "react-native";
import {useAuth} from "./presentation/components/hooks/useAuth";
import {LoginScreen} from "./presentation/screens";

export const VeterinariaApp = () => {

    const {isAuthenticated, isLoading} =useAuth();

    useEffect(() => {
        console.log('isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);
    }, [isLoading, isAuthenticated]);

    if (isLoading) {
        console.log('Mostrando ActivityIndicator');
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#eb10a2" />
            </View>
        );
    }
    console.log('Renderizando contenido principal, isAuthenticated:', isAuthenticated);
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <LoginProvider>
                        {isAuthenticated ? <MyDrawerNavigator /> : <LoginScreen />}
                    </LoginProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
}
