import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import {UserList} from "../../components/user/UserList";

export const SuperAdminScreen = () => {
    return (
        <View style={styles.container}>
            <UserList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Asegura que ocupe todo el espacio disponible
        padding: 10, // Añade un poco de margen
        backgroundColor: "#f5f5f5", // Fondo más claro
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
});