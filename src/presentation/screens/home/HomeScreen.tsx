import React from 'react';
import { View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {LoginScreen} from "../auth/LoginScreen";
import {useLoginStore} from "../../../actions/owners/login.state";

export const HomeScreen = ({ navigation }) => {
//    const estado = navigation.getParam("estado");
    const {logout } = useLoginStore();



    return (
        <View>
            <Text>Bienvenido a la pantalla principal</Text>
            <Button title="Cerrar Sesión" onPress={logout} />
        </View>
    );
};