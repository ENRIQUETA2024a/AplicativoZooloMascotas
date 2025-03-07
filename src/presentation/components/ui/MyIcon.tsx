import { Icon, useTheme } from '@ui-kitten/components';
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

interface Props {
    name: string;
    color?: string;
    white?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const MyIcon = ({ name, color, white, style }: Props) => {

    const theme = useTheme();
    if (white) {
        color = theme['color-info-100']
    } else if (!color) {
        color = theme['text-basic-color']
    } else {
        color = theme['color']
    }
    return (
        <Icon style={style} fill={color} name={name}/>
    )
}

