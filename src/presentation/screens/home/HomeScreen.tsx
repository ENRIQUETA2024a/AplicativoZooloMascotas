import React from 'react';
import { View, Text, Button } from 'react-native';
import {useOwnerLoginStore} from "../../../actions";

export const HomeScreen = ({ navigation }) => {
    const {logout } = useOwnerLoginStore();

    return (
        <View>

            <Text>Bienvenido a la pantalla principal</Text>
            <Button title="Cerrar Sesión" onPress={logout} />
        </View>
    );
};