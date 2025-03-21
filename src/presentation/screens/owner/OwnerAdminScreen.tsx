import React from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    View,
} from "react-native";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {Button, Card, Icon, Input, Layout, Text} from "@ui-kitten/components";
import {OwnerForm} from "../../components/owner/OwnerForm";
import {MyListCard} from "../../components/ui/MyListCard";
import {OwnerDashboard} from "../../../core";
import {useOwnerActions} from "../../components";

export const OwnerAdminScreen = () => {

    const {
        fetchOwners,
        handleSaveOwner,
        handleDeleteOwner,
        handleEditOwner,
        handleToggleActivate,
        resetForm,
        setForm,
        setModalVisible,
        setSearchQuery,
        handleSearch,
        //acciones
        isEditMode,
        owners,
        loading, error, modalVisible,
        form,
        searchQuery,

    } = useOwnerActions();

    const renderOwnerItem = ({item}: { item: OwnerDashboard }) => (
        <MyListCard attributes={[
            {label: "Nombre", value: `${item.names} ${item.surnames}`, icon: "person-outline"},
            {label: `${item.type_document}: `, value: item.n_document, icon: "file-text-outline"},
            {label: "Email", value: item.n_document, icon: "email-outline"},
            {label: "Celular", value: item.phone, icon: "phone-outline"},
            {label: "Direccion", value: item.address, icon: "home-outline"},
            {label: "City", value: item.city, icon: "navigation-2-outline"},
            {label: "Contacto", value: item.emergency_contact, icon: "alert-circle-outline"},
        ]}
                    iconName={"person-outline"}
                    onEdit={() => handleEditOwner(item.id)}
                    onDelete={() => handleDeleteOwner(item.id)}
                    onToggleActive={() => handleToggleActivate(item.id, !item.deleted_at)}
                    isActive={!!item.deleted_at}
        />
    )

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

            {/* Campo de Búsqueda */}
            <View style={styles.searchContainer}>
                <Input
                    placeholder="Buscar por nombre o apellido..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={handleSearch} // Buscar al presionar "Enter"
                    accessoryRight={<Icon name="search-outline"/>}
                    style={styles.searchInput}
                />
                <Button
                    style={styles.searchButton}
                    status="primary"
                    onPress={handleSearch}
                >
                    Buscar
                </Button>
            </View>

            {/* Lista de dueños */}

            {/* Lista de dueños */}
            <FlatList
                data={owners}
                renderItem={renderOwnerItem}
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
        maxHeight: "70%",
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

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        borderRadius: 10,
    },
    searchButton: {
        borderRadius: 10,
        paddingHorizontal: 15,
    },

});