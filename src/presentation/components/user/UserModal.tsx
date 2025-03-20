import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TextInput,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { updateUser } from "../../../actions";

const ROLES = [
    { label: "Super-Admin", value: 1 },
    { label: "Veterinario", value: 2 },
    { label: "Asistente", value: 3 },
    { label: "Recepción", value: 4 },
];

export const UserModal = ({ visible, onClose, user, refreshUsers }) => {
    const [editedUser, setEditedUser] = useState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        role_id: user.role.id,
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(editedUser.role_id);

    // Animación para el modal
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleUpdate = async () => {
        setLoading(true);
        const updated = await updateUser(user.id, { ...editedUser, role_id: selectedRole });

        if (updated) {
            refreshUsers(); // Recargar la lista de usuarios
            onClose(); // Cerrar modal
        } else {
            console.warn("❌ Error al actualizar el usuario");
        }
        setLoading(false);
    };

    const closeModal = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => onClose());
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            {/* Fondo Difuminado */}
            <Animated.View
                style={[
                    styles.modalOverlay,
                    {
                        opacity: animation,
                    },
                ]}
            >
                <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoiding}>
                    {/* Contenido del Modal */}
                    <Animated.View
                        style={[
                            styles.modalContent,
                            {
                                transform: [
                                    {
                                        scale: animation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.9, 1],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text style={styles.modalTitle}>Editar Usuario</Text>

                        {/* Nombre */}
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={editedUser.name}
                            onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
                            placeholder="Nombre"
                            placeholderTextColor="#aaa"
                        />

                        {/* Apellido */}
                        <Text style={styles.label}>Apellido</Text>
                        <TextInput
                            style={styles.input}
                            value={editedUser.surname}
                            onChangeText={(text) => setEditedUser({ ...editedUser, surname: text })}
                            placeholder="Apellido"
                            placeholderTextColor="#aaa"
                        />

                        {/* Correo Electrónico */}
                        <Text style={styles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.input}
                            value={editedUser.email}
                            onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                            keyboardType="email-address"
                            placeholder="Correo Electrónico"
                            placeholderTextColor="#aaa"
                        />

                        {/* Teléfono */}
                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={styles.input}
                            value={editedUser.phone}
                            onChangeText={(text) => setEditedUser({ ...editedUser, phone: text })}
                            keyboardType="phone-pad"
                            placeholder="Teléfono"
                            placeholderTextColor="#aaa"
                        />

                        {/* Rol */}
                        <Text style={styles.label}>Rol</Text>
                        <DropDownPicker
                            open={open}
                            value={selectedRole}
                            items={ROLES}
                            setOpen={setOpen}
                            setValue={setSelectedRole}
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            listItemLabelStyle={styles.dropdownItemLabel}
                            placeholder="Selecciona un rol"
                            placeholderStyle={{ color: "#aaa" }}
                        />

                        {/* Botones */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleUpdate} style={[styles.button, styles.saveButton]}>
                                <Text style={styles.buttonText}>{loading ? "Guardando..." : "Guardar"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={[styles.button, styles.cancelButton]}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    keyboardAvoiding: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        width: "90%",
        maxWidth: 400,
        padding: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#333",
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginTop: 10,
    },
    input: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginTop: 5,
        fontSize: 14,
        color: "#333",
    },
    dropdown: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        zIndex: 1000,
    },
    dropdownContainer: {
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
    },
    dropdownItemLabel: {
        fontSize: 14,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 8,
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: "#27AE60",
    },
    cancelButton: {
        backgroundColor: "#E74C3C",
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});