import React from "react";
import {
    FlatList,
    StyleSheet, TouchableOpacity,
    View, Modal,
    KeyboardAvoidingView, Platform
} from "react-native";
import {Button, Card, Icon, Input, Layout, Text,} from "@ui-kitten/components";
import {OwnerForm} from "../../components/owner/OwnerForm";
import {OwnerDashboard} from "../../../core";
import {MyActivityIndicator, MyListCard, useOwnerActions} from "../../components";


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
        isEditMode,
        owners,
        loading,
        error,
        modalVisible,
        form,
        searchQuery,
    } = useOwnerActions();

    const renderOwnerItem = ({item}: { item: OwnerDashboard }) => (
        <MyListCard
            attributes={[
                {label: "Nombre", value: `${item.names} ${item.surnames}`, icon: "person-outline"},
                {label: `${item.type_document}: `, value: item.n_document, icon: "file-text-outline"},
                {label: "Email", value: item.email, icon: "email-outline"},
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
    );

    if (loading) {
        return <MyActivityIndicator/>;
    }

    return (
        <Layout style={styles.container}>
            {/* Mostrar errores de forma no intrusiva */}
            {error && (
                <View style={styles.inlineError}>
                    <Text category="s2" status="danger">
                        {error}
                    </Text>
                    <Button
                        size="tiny"
                        appearance="ghost"
                        status="danger"
                        accessoryLeft={<Icon name="refresh-outline"/>}
                        onPress={()=>{
                            fetchOwners();
                            setSearchQuery("");
                        }}
                    />
                </View>
            )}

            {/* Campo de Búsqueda */}
            <View style={styles.searchContainer}>
                <Input
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={handleSearch}
                    accessoryRight={
                        <TouchableOpacity onPress={handleSearch}>
                            <Icon name="search-outline" fill={"#3366FF"}/>
                        </TouchableOpacity>
                    }
                    style={styles.searchInput}
                />

                <Button
                    style={styles.searchButton}
                    status={"success"}
                    accessoryLeft={<Icon name="plus-outline"/>}
                    onPress={() => {
                        resetForm();
                        setModalVisible(true);
                    }}
                >
                    Nuevo
                </Button>
            </View>

            {/* Lista de dueños */}
            <FlatList
                data={owners}
                renderItem={renderOwnerItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon
                            name="people-outline"
                            fill="#8F9BB3"
                            style={styles.emptyIcon}
                        />
                        <Text category="s1" appearance="hint" style={styles.emptyText}>
                            {searchQuery
                                ? "No se encontraron dueños con ese criterio"
                                : "No hay dueños registrados aún"}
                        </Text>
                        {searchQuery && (
                            <Button
                                size="small"
                                appearance="ghost"
                                status="basic"
                                onPress={() => {
                                    setSearchQuery('');
                                    fetchOwners();
                                }}
                            >
                                Mostrar todos
                            </Button>
                        )}
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={modalVisible} transparent animationType="fade">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingContainer}
                >
                <View style={styles.modalBackdrop}>
                    {/* Contenedor del Modal */}
                    <View style={styles.modalContainer}>
                        <Card disabled style={styles.modalCard}>
                            {/* Título del Modal */}
                            <Text category="h6" style={styles.modalTitle}>
                                {isEditMode ? "Editar Dueño" : "Nuevo Dueño"}
                            </Text>

                            {/* Formulario */}
                            <OwnerForm
                                form={form}
                                isEditMode={isEditMode}
                                onChange={(field, value) => setForm({ ...form, [field]: value })}
                                onSave={handleSaveOwner}
                                onCancel={() => setModalVisible(false)}
                            />
                        </Card>
                    </View>
                </View>
                </KeyboardAvoidingView>
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
        flexGrow: 1,
    },
    inlineError: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFECEC',
        marginHorizontal: 15,
        borderRadius: 8,
        marginTop: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        width: 60,
        height: 60,
        marginBottom: 15,
        opacity: 0.5,
    },
    emptyText: {
        textAlign: "center",
        color: "#8F9BB3",
        marginBottom: 15,
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

    errorText: {
        flex: 1,
        marginRight: 10,
    },

    // Estilo para el indicador de búsqueda
    searchIndicator: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    // Fondo semi-transparente
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semi-transparente
        justifyContent: "center", // Centrado verticalmente
        alignItems: "center", // Centrado horizontalmente
    },
    // Contenedor del modal
    modalContainer: {
        width: "90%", // Ancho del modal
        maxWidth: 500, // Máximo ancho para pantallas grandes
        borderRadius: 20, // Bordes redondeados más pronunciados
        overflow: "hidden", // Evita que el contenido se desborde
        elevation: 10, // Sombra para Android
        shadowColor: "#000", // Sombra para iOS
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    // Estilo del Card
    modalCard: {
        width: "100%",
        maxHeight: "90%", // Limita el alto al 80% de la pantalla
        borderRadius: 16,
        padding: 0, // Padding manejado por los hijos
        backgroundColor: "#FFF",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    // Título del modal
    modalTitle: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 20, // Tamaño de fuente más grande
        color: "#1A2138", // Color de texto oscuro
    },

    // Teclado
    keyboardAvoidingContainer: {
        flex: 1,
    },
});