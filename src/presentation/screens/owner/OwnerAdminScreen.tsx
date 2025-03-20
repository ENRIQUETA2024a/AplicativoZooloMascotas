import React, {useEffect, useState} from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {
    createOwner,
    deleteOwner,
    getOwnerById,
    getOwners,
    updateOwner,
} from "../../../actions";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {Button, Card, Icon, Input, Layout, Text} from "@ui-kitten/components";
import {OwnerCard} from "../../components/owner/OwnerCard";
import {OwnerForm} from "../../components/owner/OwnerForm";

export const OwnerAdminScreen = () => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form, setForm] = useState({
        names: "",
        surnames: "",
        type_document: "",
        n_document: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        emergency_contact: "",
    });

    // Cargar lista de dueños
    const fetchOwners = async () => {
        setLoading(true);
        try {
            const ownerList = await getOwners();
            setOwners(ownerList || []);
        } catch (err) {
            setError("Error al cargar los dueños");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    // Crear o actualizar dueño
    const handleSaveOwner = async () => {
        if (!form.names || !form.surnames || !form.type_document || !form.n_document || !form.phone) {
            alert("Por favor, completa los campos obligatorios: Nombres, Apellidos, Tipo de Documento, Número de Documento y Teléfono.");
            return;
        }
        setLoading(true);
        try {
            if (isEditMode) {
                await updateOwner(selectedOwner.id, form);
            } else {
                await createOwner(form);
            }
            await fetchOwners(); // Refrescar lista
            setModalVisible(false);
            resetForm();
        } catch (err) {
            setError(`Error al ${isEditMode ? "actualizar" : "crear"} el dueño`);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar dueño
    const handleDeleteOwner = async (id) => {
        if (confirm("¿Estás seguro de eliminar este dueño?")) {
            setLoading(true);
            try {
                await deleteOwner(id);
                await fetchOwners(); // Refrescar lista
            } catch (err) {
                setError("Error al eliminar el dueño");
            } finally {
                setLoading(false);
            }
        }
    };

    // Ver detalles y preparar edición
    const handleEditOwner = async (id) => {
        try {
            const owner = await getOwnerById(id);
            setSelectedOwner(owner);
            setForm({
                names: owner.names || "",
                surnames: owner.surnames || "",
                type_document: owner.type_document || "",
                n_document: owner.n_document || "",
                email: owner.email || "",
                phone: owner.phone || "",
                address: owner.address || "",
                city: owner.city || "",
                emergency_contact: owner.emergency_contact || "",
            });
            setIsEditMode(true);
            setModalVisible(true);
        } catch (err) {
            setError("Error al cargar los detalles del dueño");
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setForm({
            names: "",
            surnames: "",
            type_document: "",
            n_document: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            emergency_contact: "",
        });
        setSelectedOwner(null);
        setIsEditMode(false);
    };

    if (loading) {
        return <MyActivityIndicator/>;
    }

    if (error) {
        return (
            <Layout style={styles.errorContainer}>
                <Text category="h6" status="danger" style={styles.errorText}>
                    {error}
                </Text>
                <Button
                    style={styles.retryButton}
                    status="primary"
                    accessoryLeft={<Icon name="refresh-outline"/>}
                    onPress={fetchOwners}
                >
                    Reintentar
                </Button>
            </Layout>
        );
    }

    return (
        <Layout style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text category="h5" style={styles.headerTitle}>
                    Gestión de Dueños
                </Text>
                <Button
                    style={styles.addButton}
                    status="success"
                    accessoryLeft={<Icon name="plus-outline"/>}
                    onPress={() => {
                        resetForm();
                        setModalVisible(true);
                    }}
                >
                    Nuevo Dueño
                </Button>
            </View>

            {/* Lista de dueños */}
            <FlatList
                data={owners}
                renderItem={({item}) => (
                    <OwnerCard
                        owner={item}
                        onEdit={handleEditOwner}
                        onDelete={handleDeleteOwner}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text category="s1" appearance="hint" style={styles.emptyText}>
                        No hay dueños registrados aún.
                    </Text>
                }
                showsVerticalScrollIndicator={false}
            />

            {/* Modal para crear/editar */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <Card disabled style={styles.modalCard}>
                    <Text category="h6" style={styles.modalTitle}>
                        {isEditMode ? "Editar Dueño" : "Nuevo Dueño"}
                    </Text>
                    <OwnerForm
                        form={form}
                        isEditMode={isEditMode}
                        onChange={(field, value) => setForm({...form, [field]: value})}
                        onSave={handleSaveOwner}
                        onCancel={() => setModalVisible(false)}
                    />
                </Card>
            </Modal>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
    },
    headerTitle: {
        color: "#1A2138",
        fontWeight: "bold",
    },
    addButton: {
        borderRadius: 10,
    },
    listContent: {
        padding: 15,
    },


    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFF",
    },
    errorText: {
        textAlign: "center",
        marginBottom: 20,
    },
    retryButton: {
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    emptyText: {
        textAlign: "center",
        color: "#8F9BB3",
        padding: 20,
    },
    modalCard: {
        width: "90%",
        maxHeight: "80%",
        padding: 20,
        borderRadius: 12,
        alignSelf: "center",
        marginTop: "10%",
        backgroundColor: "#FFF",
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        color: "#1A2138",
    },


});