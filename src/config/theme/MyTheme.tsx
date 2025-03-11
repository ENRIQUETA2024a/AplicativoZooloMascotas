import { StyleSheet } from "react-native";

export interface ThemeColors {
    primary: string;
    text: string;
    background: string;
    cardBackground: string;
    buttonTextColor: string;
    buttonColor: string;
}

export const colors_light: ThemeColors = {
    primary: "#1ead25",
    text: "black",
    background: "#ffffff",
    cardBackground: "white",
    buttonTextColor: "wite",
    buttonColor: "#rgb(52, 49, 206)",
};

export const colors_dark: ThemeColors = {
    primary: "#1ead25",
    text: "black",
    background: "#000000",
    cardBackground: "white",
    buttonTextColor: "wite",
    buttonColor: "#rgb(52, 49, 206)",
};



export const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop:  20,
    },
});

