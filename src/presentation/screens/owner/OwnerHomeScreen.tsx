import React from 'react';
import {View} from 'react-native';
import {MyCustomLayout} from "../../components/ui/MyCustomLayout";
import {PetScreen} from "../pet/PetScreen";


export const OwnerHomeScreen = ({navigation}) => {

    return (
        <MyCustomLayout>
            <PetScreen/>
        </MyCustomLayout>
    );
};