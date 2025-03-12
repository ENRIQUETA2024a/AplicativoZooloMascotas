import {ActivityIndicator, View} from "react-native";
import React from "react";

export const MyActivityIndicator=()=>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#eb10a2" />
        </View>
    )
}