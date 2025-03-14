import {ActivityIndicator, StyleProp, View, ViewStyle} from "react-native";
import React from "react";

interface Props {
    style? : StyleProp<ViewStyle>
}

export const MyActivityIndicator=({style}:Props)=>{
    return (
        <View style={[style,{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>

            <ActivityIndicator size="large" color="#eb10a2" />
        </View>
    )
}