import React from "react";
import {
    FlatList,
    TouchableOpacity,
    View, Modal,
    KeyboardAvoidingView, Platform
} from "react-native";
import {Button, Card, Icon, Input, Layout, Text,} from "@ui-kitten/components";
import {OwnerForm} from "../../components/owner/OwnerForm";
import {OwnerDashboard} from "../../../core";
import {MyActivityIndicator, MyListCard, useOwnerActions} from "../../components";
import {StylesAdminScreen} from "../../styles/StylesAdminScreen";


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
            iconName={"people-outline"}
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
        <Layout style={StylesAdminScreen.container}>
            {/* Mostrar errores de forma no intrusiva */}
            {error && (
                <View style={StylesAdminScreen.inlineError}>
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
            <View style={StylesAdminScreen.searchContainer}>
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
                    style={StylesAdminScreen.searchInput}
                />

                {/*<Button*/}
                {/*    style={StylesAdminScreen.searchButton}*/}
                {/*    status={"success"}*/}
                {/*    accessoryLeft={<Icon name="plus-outline"/>}*/}
                {/*    onPress={() => {*/}
                {/*        resetForm();*/}
                {/*        setModalVisible(true);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Nuevo*/}
                {/*</Button>*/}
            </View>

            {/* Lista de dueños */}
            <FlatList
                data={owners}
                renderItem={renderOwnerItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={StylesAdminScreen.listContent}
                ListEmptyComponent={
                    <View style={StylesAdminScreen.emptyContainer}>
                        <Icon
                            name="people-outline"
                            fill="#8F9BB3"
                            style={StylesAdminScreen.emptyIcon}
                        />
                        <Text category="s1" appearance="hint" style={StylesAdminScreen.emptyText}>
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
                    style={StylesAdminScreen.keyboardAvoidingContainer}
                >
                <View style={StylesAdminScreen.modalBackdrop}>
                    {/* Contenedor del Modal */}
                    <View style={StylesAdminScreen.modalContainer}>
                        <Card disabled style={StylesAdminScreen.modalCard}>
                            {/* Título del Modal */}
                            <Text category="h6" style={StylesAdminScreen.modalTitle}>
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
