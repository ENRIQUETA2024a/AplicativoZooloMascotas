import {UserFormI} from "../../../core/dashboard/UserDashboard";
import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {MyInput} from "../ui/MyInput";
import DropDownPicker from "react-native-dropdown-picker";
import {Button, Icon, Text} from "@ui-kitten/components";

interface Props {
    form: UserFormI;
    isEditMode: boolean;
    onChange: (field: keyof UserFormI, value: any) => void;
    onChangeDate?: (updatedPet: UserFormI) => void;
    onSave: () => void;
    onCancel: () => void;
    borderColorInput?: string;
}

const Roles = [
    {label: "Super-Admin", value: 1},
    {label: "Veterinario", value: 2},
    {label: "Asistente", value: 3},
    {label: "Recepción", value: 4},
];


export const UserForm = ({
                             form,
                             isEditMode,
                             onChange,
                             onSave,
                             onCancel,
                             borderColorInput = "#3366FF"
                         }: Props) => {
    const [focusedField, setFocusedField] = useState("");
    const defaultBorderColorInput = "#8F9BB3";

    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<number | null>(form.role || null); // Tipo explícito: number | null

    // Sincroniza el selectedRole con el form.role cuando cambie
    useEffect(() => {
        setSelectedRole(form.role || null);
    }, [form.role]);

// Actualiza form.role cuando cambia el valor del DropDownPicker
    const handleValueChange = (value: number | null) => {
        onChange("role", value || undefined); // Actualiza el form con el nuevo valor
    };

    const formItems = [
        <MyInput
            labelInput="Nombres *"
            valueInput={form.name}
            onChangeText={(text) => onChange("name", text)}
            styleInput={[
                focusedField === "name" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
            ]}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField("")}
            fillColorIcon={focusedField === "name" ? borderColorInput : defaultBorderColorInput}

            placeHolderInput={"Ej. Juan Carlos"}
            iconName={"behance-outline"}
        />
        ,
        <MyInput
            labelInput="Apellidos *"
            valueInput={form.surname}
            onChangeText={(text) => onChange("surname", text)}
            styleInput={[
                focusedField === "surname" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
            ]}
            onFocus={() => setFocusedField("surname")}
            onBlur={() => setFocusedField("")}
            fillColorIcon={focusedField === "surname" ? borderColorInput : defaultBorderColorInput}

            placeHolderInput={"Ej. Lexy"}
            iconName={"behance-outline"}
        />
        ,
        <MyInput
            labelInput="Email *"
            valueInput={form.email}
            onChangeText={(text) => onChange("email", text)}
            styleInput={[
                focusedField === "email" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
            ]}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField("")}
            fillColorIcon={focusedField === "email" ? borderColorInput : defaultBorderColorInput}

            placeHolderInput={"Ej. Lexy"}
            iconName={"behance-outline"}
        />
        ,
        <MyInput
            labelInput="Celular *"
            valueInput={form.phone}
            onChangeText={(text) => onChange("phone", text)}
            styleInput={[
                focusedField === "phone" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
            ]}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField("")}
            fillColorIcon={focusedField === "phone" ? borderColorInput : defaultBorderColorInput}

            placeHolderInput={"Ej. 950305417"}
            iconName={"behance-outline"}
        />

        ,
        <DropDownPicker
            open={open}
            value={selectedRole}
            items={Roles}
            setOpen={setOpen}
            setValue={setSelectedRole} // Usa el setter directamente
            onChangeValue={handleValueChange} // Llama a la lógica adicional después del cambio
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            listItemLabelStyle={styles.dropdownItemLabel}
            placeholder="Selecciona un rol"
            placeholderStyle={{color: "#aaa"}}
        />
        ,
        <View style={styles.modalActions}>
            <Button
                status="basic"
                appearance="outline"
                onPress={onCancel}
                style={styles.modalButton}
                accessoryLeft={<Icon name="close-outline"/>}
            >
                Cancelar
            </Button>
            <Button
                status={!isEditMode ? "success" : "warning"}
                onPress={onSave}
                style={styles.modalButton}
                accessoryLeft={<Icon name="save-outline"/>}
            >
                {!isEditMode ? "Guardar" : "Actualizar"}
            </Button>
        </View>,
        <Text style={styles.footerText} appearance="hint">
            * Campos obligatorios
        </Text>
    ]

    return (
        <FlatList
            data={formItems}
            renderItem={({ item }) => item}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    modalScroll: {
        paddingBottom: 20,
    },
    inputText: {
        fontSize: 16,
        color: "#1A2138",
    },
    footerText: {
        fontSize: 12,
        color: "#8F9BB3",
        textAlign: "center",
        marginTop: 15,
    },
    input: {
        marginBottom: 15,
        borderRadius: 12, // Bordes redondeados más pronunciados
        borderColor: "#E8ECEF", // Borde suave
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 12, // Padding interno más grande
        backgroundColor: "#F9FAFB", // Fondo claro
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 12, // Bordes redondeados más pronunciados
        height: 50, // Altura fija para los botones
        justifyContent: "center", // Centrar el texto verticalmente
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
});