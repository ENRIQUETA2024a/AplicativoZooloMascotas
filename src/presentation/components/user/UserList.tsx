import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useUsers } from "../hooks/useUsers";
import { MyActivityIndicator } from "../ui/MyActivityIndicator";
import { UserDashboard } from "../../../core";

export const UserList = () => {
    const { users, loading, error } = useUsers();

    if (loading) {
        return <MyActivityIndicator />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    // 📊 Calculamos las métricas
    const totalUsers = users.length;
    const totalVeterinarios = users.filter(user => user.role.name === "Veterinario").length;
    const totalAsistentes = users.filter(user => user.role.name === "Asistente").length;
    const totalRecepcion = users.filter(user => user.role.name === "Recepcion").length;
    const lastRegisteredDate = totalUsers > 0
        ? new Date(users[users.length - 1].created_at).toLocaleDateString()
        : "N/A";

    return (
        <View style={styles.container}>
            {/* 📊 Sección de métricas */}
            <View style={styles.metricsContainer}>
                <MetricCard title="Total Usuarios" value={totalUsers.toString()} color="#1ABC9C" />
                <MetricCard title="Total Veterinarios" value={totalVeterinarios.toString()} color="#3498DB" />
                <MetricCard title="Total Asistentes" value={totalAsistentes.toString()} color="#F39C12" />
                <MetricCard title="Total Recepcionistas" value={totalRecepcion.toString()} color="#9B59B6" />
            </View>

            {/* Lista de usuarios */}
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <UserCard user={item} />}
            />
        </View>
    );
};

// 🔹 Tarjeta de usuario
const UserCard = ({ user }: { user: UserDashboard }) => {
    return (
        <View style={styles.card}>
            <Image source={require("../../../assets/default_avatar.jpg")} style={styles.avatar} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{user.name} {user.surname}</Text>
                <Text style={styles.email}>{user.email} {user.deleted_at}</Text>
                <Text style={styles.role}>{user.role.name}</Text>
            </View>
        </View>
    );
};

// 🔹 Tarjeta de Métricas
const MetricCard = ({ title, value, color }: { title: string, value: string, color: string }) => {
    return (
        <View style={[styles.metricCard, { backgroundColor: color }]}>
            <Text style={styles.metricTitle}>{title}</Text>
            <Text style={styles.metricValue}>{value}</Text>
        </View>
    );
};

// 🎨 Estilos mejorados
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
    metricsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12, // Agrega separación entre tarjetas
        marginBottom: 15,
    },
    metricCard: {
        flex: 1,
        minWidth: "48%", // Evita que se peguen demasiado en pantallas pequeñas
        paddingVertical: 20, // Mayor espacio interno
        paddingHorizontal: 10,
        borderRadius: 12, // Bordes más suaves
        alignItems: "center",
        marginBottom: 12, //  Espacio entre filas
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    metricTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    metricValue: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 5,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
        color: "#666",
    },
    role: {
        fontSize: 14,
        color: "#3498db",
        fontWeight: "bold",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
});
