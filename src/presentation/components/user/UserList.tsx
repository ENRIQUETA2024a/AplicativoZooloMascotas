import React, {useState} from "react";
import {FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
import { useUsers } from "../hooks/useUsers";
import { MyActivityIndicator } from "../ui/MyActivityIndicator";
import { UserCard } from "./UserCard";

export const UserList = () => {
    const { users, loading, error, refreshUsers } = useUsers();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async() => {
        setRefreshing(true);
        await refreshUsers();
        setRefreshing(false);
    }

    if (loading) return <MyActivityIndicator />;

    if (error)
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            {/*/!* Sección de Métricas *!/*/}
            {/*<View style={styles.metricsContainer}>*/}
            {/*    <MetricCard*/}
            {/*        title="Total Usuarios"*/}
            {/*        value={users.length.toString()}*/}
            {/*        color="#1ABC9C"*/}
            {/*    />*/}
            {/*    <MetricCard*/}
            {/*        title="Veterinarios"*/}
            {/*        value={users.filter((user) => user.role.name === "Veterinario").length.toString()}*/}
            {/*        color="#3498DB"*/}
            {/*    />*/}
            {/*    <MetricCard*/}
            {/*        title="Asistentes"*/}
            {/*        value={users.filter((user) => user.role.name === "Asistente").length.toString()}*/}
            {/*        color="#F39C12"*/}
            {/*    />*/}
            {/*    <MetricCard*/}
            {/*        title="Recepcionistas"*/}
            {/*        value={users.filter((user) => user.role.name === "Recepcion").length.toString()}*/}
            {/*        color="#9B59B6"*/}
            {/*    />*/}
            {/*</View>*/}

            {/* Lista de Usuarios */}
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <UserCard user={item} refreshUsers={refreshUsers} />}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    metricsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap:8,
        marginBottom: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
    },
    listContent: {
        paddingBottom: 20, // Espacio al final de la lista
    },
});