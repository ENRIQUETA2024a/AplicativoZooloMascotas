import React from 'react';
import {MyCustomLayout} from "../../components/ui/MyCustomLayout";
import {PetScreen} from "../pet/PetScreen";

export const OwnerHomeScreen = ({navigation}) => {

    return (
        <MyCustomLayout>
            <PetScreen/>
        </MyCustomLayout>
    );
};