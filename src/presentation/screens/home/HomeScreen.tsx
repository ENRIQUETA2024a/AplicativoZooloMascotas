import React from 'react';
import { View, Text, Button } from 'react-native';
import {useLoginStore} from "../../../actions/owners/ownerLoginState";

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