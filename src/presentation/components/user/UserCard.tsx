import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { UserModal } from "./UserModal";
import { deleteUser } from "../../../actions";

export const UserCard = ({ user, refreshUsers }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const isDeleted = user.deleted_at !== null;

    const handleDelete = async () => {
        Alert.alert("Eliminar Usuario", "¿Estás seguro de que quieres eliminar este usuario?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: async () => {
                    try {
                        const deleted = await deleteUser(user.id);
                        if (deleted) {
                            refreshUsers();
                        } else {
                            Alert.alert("Error", "No se pudo eliminar el usuario.");
                        }
                    } catch (error) {
                        Alert.alert("Error", "Ocurrió un problema al eliminar.");
                    }
                },
            },
        ]);
    };

    return (
        <View style={[styles.card, isDeleted && styles.deletedCard]}>
            {/* Etiqueta de Eliminado */}
            {isDeleted && <Text style={styles.deletedLabel}>Eliminado</Text>}

            {/* Nombre */}
            <Text style={[styles.name, isDeleted && styles.deletedText]}>
                {user.name} {user.surname}
            </Text>

            {/* Email */}
            <Text style={[styles.email, isDeleted && styles.deletedText]}>{user.email}</Text>

            {/* Teléfono */}
            <Text style={[styles.phone, isDeleted && styles.deletedText]}>{user.phone}</Text>

            {/* Rol */}
            <Text style={[styles.role, isDeleted && styles.deletedText]}>{user.role.name}</Text>

            {/* Contenedor de Botones */}
            <View style={styles.buttonContainer}>
                {/* Botón de Editar */}
                <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.button, styles.editButton]}>
                    <Text style={styles.buttonText}>✏️ Editar</Text>
                </TouchableOpacity>

                {/* Botón de Eliminar */}
                <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>🗑️ Eliminar</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de Edición */}
            <UserModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                user={user}
                refreshUsers={refreshUsers}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
        position: "relative",
    },
    deletedCard: {
        backgroundColor: "#F2F2F2",
        borderWidth: 1,
        borderColor: "#E74C3C",
    },
    deletedLabel: {
        position: "absolute",
        top: 8,
        right: 10,
        backgroundColor: "#E74C3C",
        color: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        fontSize: 12,
        fontWeight: "bold",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    email: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: "#777",
        marginBottom: 8,
    },
    role: {
        fontSize: 14,
        color: "#888",
        marginBottom: 10,
    },
    deletedText: {
        opacity: 0.6,
    },
    buttonContainer: {
        flexDirection: "row", // Coloca los botones en la misma fila
        justifyContent: "space-between", // Separa los botones
        marginTop: 10,
    },
    button: {
        flex: 1, // Asegura que ambos botones ocupen el mismo espacio
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5, // Espacio entre los botones
    },
    editButton: {
        backgroundColor: "#3498DB", // Azul para editar
    },
    deleteButton: {
        backgroundColor: "#E74C3C", // Rojo para eliminar
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});