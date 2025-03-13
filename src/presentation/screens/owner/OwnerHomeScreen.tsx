import React from 'react';
import { View, Button } from 'react-native';
import {MyCustomLayout} from "../../components/ui/MyCustomLayout";
import {useLoginStore} from "../../../actions";
import {PetScreen} from "../pet/PetScreen";


export const OwnerHomeScreen = ({ navigation }) => {
    const {logout } = useLoginStore();

    return (
        <MyCustomLayout>
            <View>
                 <PetScreen />
                <Button title="Cerrar Sesión" onPress={logout} />
            </View>
        </MyCustomLayout>
    );
};