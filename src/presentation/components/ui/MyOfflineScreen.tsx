import React from "react";
import { Layout, Text, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export const MyOfflineScreen = () => {
    return (
        <Layout style={styles.container}>
            <Icon name="wifi-off-outline" fill="#8F9BB3" style={styles.icon} />
            <Text category="h5" style={styles.title}>
                Sin conexión al servidor
            </Text>
            <Text appearance="hint" style={styles.subtitle}>
                No se pudo establecer conexión con el servidor. Intenta nuevamente más tarde.
            </Text>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    icon: {
        width: 48,
        height: 48,
        marginBottom: 16,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        textAlign: "center",
    },
});
