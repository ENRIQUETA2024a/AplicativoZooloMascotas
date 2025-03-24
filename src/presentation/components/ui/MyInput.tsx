import {Icon, Input} from "@ui-kitten/components";
import {KeyboardTypeOptions, StyleProp, StyleSheet, TextStyle} from "react-native";

interface Props {
    labelInput: string,
    valueInput: string,
    onChangeText?: (text: string) => void,
    styleInput?: StyleProp<TextStyle>,
    onFocus?: () => void,
    onBlur?: () => void,
    iconName: string,
    fillColorIcon: string,
    placeHolderInput: string,
    keyboardType?: KeyboardTypeOptions,
    multiline?:boolean,
}


export const MyInput = ({
                            labelInput,
                            valueInput,
                            onChangeText,
                            styleInput,
                            onFocus,
                            onBlur,
                            iconName,
                            fillColorIcon,
                            placeHolderInput,
                            keyboardType = "default",
                            multiline = false,
                        }: Props) => {
    return (
        <Input
            label={labelInput}
            value={valueInput}
            onChangeText={onChangeText}
            style={[styles.input, styleInput]}
            onFocus={onFocus}
            onBlur={onBlur}
            accessoryLeft={<Icon name={iconName} fill={fillColorIcon}/>}

            placeholder={placeHolderInput}
            textStyle={styles.inputText}
            keyboardType={keyboardType}

            multiline={multiline}
        />
    )
}


const styles = StyleSheet.create({
    inputText: {
        fontSize: 16,
        color: "#1A2138",
    },
    input: {
        marginBottom: 15,
        borderRadius: 12, // Bordes redondeados más pronunciados
        borderColor: "#E8ECEF", // Borde suave
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 12, // Padding interno más grande
        backgroundColor: "#F9FAFB", // Fondo claro
    },
});