import React from 'react';
import { View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {LoginScreen} from "../auth/LoginScreen";

export const HomeScreen = ({ navigation }) => {
    const handleLogout = async () => {
        // Elimina el token almacenado
        await SecureStore.deleteItemAsync('authToken');

        // Redirige al usuario a la pantalla de login
        navigation.navigate(LoginScreen);
    };

    return (
        <View>
            <Text>Bienvenido a la pantalla principal</Text>
            <Button title="Cerrar Sesión" onPress={handleLogout} />
        </View>
    );
};