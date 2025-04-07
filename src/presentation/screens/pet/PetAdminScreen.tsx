import {FlatList, KeyboardAvoidingView, Modal, Platform, TouchableOpacity, View} from "react-native";
import {usePetActions} from "../../components/hooks/pet/usePetActions";
import {PetDashboard} from "../../../core";
import {MyActivityIndicator, MyListCard} from "../../components";
import React from "react";
import {Button, Card, Icon, Input, Layout, Text} from "@ui-kitten/components";
import {StylesAdminScreen} from "../../styles/StylesAdminScreen";
import {PetForm} from "../../components/pet/PetForm";

export const PetAdminScreen = () => {

    const {
        //acciones
        fetchPets,
        handleSavePets,
        handleDeletePets,
        handleEditPet,
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
        pets,
        loading,
        error,
        modalVisible,
        form,
        searchQuery,
    } = usePetActions();

    const renderPetItem = ({item}: { item: PetDashboard }) => (
        <MyListCard attributes={[
            {label: "Foto", value: item.photo, icon: "camera-outline", isImage: true},
            {label: "Nombre", value: item.name, icon: "behance-outline"},
            {label: "Especie", value: item.specie, icon: "copy-outline"},
            {label: "Raza", value: item.breed, icon: "attach-2-outline"},
            {
                label: "Fecha Nacimiento",
                value: new Date(item.birth_date).toLocaleDateString("es-ES"),
                icon: "calendar-outline"
            },
            {label: "Genero", value: item.gender, icon: "cube-outline"},
            {label: "Color", value: item.color, icon: "color-palette-outline"},
            {label: "Peso", value: item.weight, icon: "clipboard-outline"},
            {label: "Notas Meditas", value: item.medical_notes, icon: "file-text-outline"},
            {label: "Dueño ", value: item.owner, icon: "person-done-outline"},
            {label: "Celular ", value: item.phone, icon: "phone-call-outline"},
        ]}

                    iconName={"heart-outline"}
                    onEdit={() => handleEditPet(item.id)}
                    onDelete={() => handleDeletePets(item.id)}
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
                        onPress={() => {
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

            {/* Lista de Mascotas */}
            <FlatList
                data={pets}
                renderItem={renderPetItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={StylesAdminScreen.listContent}
                ListEmptyComponent={
                    <View style={StylesAdminScreen.emptyContainer}>
                        <Icon
                            name="heart-outline"
                            fill="#8F9BB3"
                            style={StylesAdminScreen.emptyIcon}
                        />
                        <Text category="s1" appearance="hint" style={StylesAdminScreen.emptyText}>
                            {searchQuery
                                ? "No se encontraron mascotas con ese criterio"
                                : "No hay mascotas registradas aún"}
                        </Text>
                        {searchQuery && (
                            <Button
                                size="small"
                                appearance="ghost"
                                status="basic"
                                onPress={() => {
                                    setSearchQuery('');
                                    fetchPets();
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
                                    {isEditMode ? "Editar Mascota" : "Nueva Mascota"}
                                </Text>

                                {/* Formulario */}
                                <PetForm
                                    form={form}
                                    isEditMode={isEditMode}
                                    onChange={(field, value) =>
                                        setForm((prevForm) => ({...prevForm, [field]: value})) // Usar prevForm en lugar de form
                                    }
                                    onSave={handleSavePets}
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


