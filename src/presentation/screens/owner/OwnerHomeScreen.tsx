import React from 'react';
import { View, Text, Button } from 'react-native';
import {useLoginStore} from "../../../actions/owners/ownerLoginState";
import {MyCustomLayout} from "../../components/ui/MyCustomLayout";
import {OwnerPetsScreen} from "./OwnerPetsScreen";


export const OwnerHomeScreen = ({ navigation }) => {
//    const estado = navigation.getParam("estado");
    const {logout,owner } = useLoginStore();


    return (
        <MyCustomLayout>
            <View>
                <Text>Bienvenido OwnerHomeScreen 2025 -- 99</Text>
                <Text> {owner.names} </Text>

                <OwnerPetsScreen />



                <Button title="Cerrar Sesión" onPress={logout} />
            </View>
        </MyCustomLayout>
    );
};