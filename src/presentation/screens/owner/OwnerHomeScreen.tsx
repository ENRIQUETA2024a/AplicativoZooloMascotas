import React from 'react';
import {PetScreen} from "../pet/PetScreen";
import {MyCustomLayout} from "../../components";

export const OwnerHomeScreen = ({navigation}) => {

    return (
        <MyCustomLayout>
            <PetScreen/>
        </MyCustomLayout>
    );
};