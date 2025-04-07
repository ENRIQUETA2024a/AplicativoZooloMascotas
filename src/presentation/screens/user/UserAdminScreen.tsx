import {MyActivityIndicator, MyListCard} from "../../components";
import {useUserActions} from "../../components/hooks/user/useUserActions";
import {UserDashboard} from "../../../core/dashboard/UserDashboard";
import {StylesAdminScreen} from "../../styles/StylesAdminScreen";
import {Button, Card, Icon, Input, Layout, Text} from "@ui-kitten/components";
import {FlatList, KeyboardAvoidingView, Modal, Platform, TouchableOpacity, View} from "react-native";
import React from "react";
import {UserForm} from "../../components/user/UserForm";

export const UserAdminScreen = () => {

    const {
        //acciones
        fetchUsers,
        handleSaveUsers,
        handleDeleteUser,
        handleEditUser,
        handleToggleActivate,

        //form
        resetForm,
        //setStates
        setForm,
        setModalVisible,
        setSearchQuery,
        handleSearch,
        //States
        isEditMode,
        users,
        loading,
        error,
        modalVisible,
        form,
        searchQuery,
    } = useUserActions();


    const renderUserItem = ({item}: { item: UserDashboard }) => (
        <MyListCard
            attributes={[
                {label: "Nombre", value: item.name, icon: "person-outline"},
                {label: "Apellidos", value: item.surname, icon: "edit-2-outline"},
                {label: "Email", value: item.email, icon: "email-outline"},
                {label: "Celular", value: item.phone , icon: "phone-outline"},
                {label: "Rol", value: item.role.name , icon: "shield-outline"},
            ]}
            iconName={"person-outline"}
            onEdit={() => handleEditUser(item.id)}
            onDelete={() => handleDeleteUser(item.id)}
            onToggleActive={() => handleToggleActivate(item.id, !item.deleted_at)}
            isActive={!!item.deleted_at}
        />
    )
    if (loading) {
        return <MyActivityIndicator/>
    }

    return(
        <Layout style={StylesAdminScreen.container} >
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
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={StylesAdminScreen.listContent}
                ListEmptyComponent={
                    <View style={StylesAdminScreen.emptyContainer}>
                        <Icon
                            name="person-outline"
                            fill="#8F9BB3"
                            style={StylesAdminScreen.emptyIcon}
                        />
                        <Text category="s1" appearance="hint" style={StylesAdminScreen.emptyText}>
                            {searchQuery
                                ? "No se encontraron usuarios con ese criterio"
                                : "No hay usuarios registrados aún"}
                        </Text>
                        {searchQuery && (
                            <Button
                                size="small"
                                appearance="ghost"
                                status="basic"
                                onPress={() => {
                                    setSearchQuery('');
                                    fetchUsers();
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
                                    {isEditMode ? "Editar Usuario" : "Nuevo Usuario"}
                                </Text>

                                {/* Formulario */}
                                <UserForm
                                    form={form}
                                    isEditMode={isEditMode}
                                    onChange={(field, value) =>
                                        setForm((prevForm) => ({ ...prevForm, [field]: value })) // Usar prevForm en lugar de form
                                    }
                                    onSave={handleSaveUsers}
                                    onCancel={() => setModalVisible(false)}
                                />
                            </Card>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </Layout>
    )
}