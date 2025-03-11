import { Layout } from "@ui-kitten/components";
import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { colors_light, globalStyles } from "../../../config/theme/MyTheme";
interface Properties {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

export const MyCustomLayout = ({ style, children }: Properties) => {

    return (
        <Layout
            style={[
                globalStyles.mainContainer,
                style,
                {
                    backgroundColor: colors_light.background,
                },
            ]}
        >
            {children}
        </Layout>
    );
};
