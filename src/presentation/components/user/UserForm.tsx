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
    onSave: () => void;
    onCancel: () => void;
    borderColorInput?: string;
}

const Roles = [
    {label: "Super-Admin", value: 1},
    {label: "Veterinario", value: 2},
    {label: "Asistente", value: 4},
    {label: "Recepción", value: 5},
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
    const [selectedRole, setSelectedRole] = useState<number | null>(form.role_id || null); // Tipo explícito: number | null

    // Sincroniza el selectedRole con el form.role cuando cambie
    useEffect(() => {
        setSelectedRole(form.role_id || null);
    }, [form.role_id]);

// Actualiza form.role cuando cambia el valor del DropDownPicker
    const handleValueChange = (value: number | null) => {
        onChange("role_id", value || undefined); // Actualiza el form con el nuevo valor
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
            iconName={"person-outline"}
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

            placeHolderInput={"Ej. Aranda Diaz"}
            iconName={"edit-2-outline"}
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

            placeHolderInput={"Ej. example@gmail.com"}
            iconName={"email-outline"}
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

            placeHolderInput={"Ej. 987654321"}
            iconName={"phone-outline"}
        />

        ,
        <View style={styles.dropdownViewContainer}>
            <Text style={styles.label}>Rol *</Text>
            <DropDownPicker
                open={open}
                value={selectedRole}
                items={Roles}
                setOpen={setOpen}
                setValue={setSelectedRole}
                onChangeValue={handleValueChange}
                style={[
                    styles.input,  // Usa el mismo estilo base que tus MyInput
                    styles.dropdown,
                    focusedField === "role" && {borderColor: borderColorInput} // Borde dinámico
                ]}
                dropDownContainerStyle={styles.dropdownContainer}
                listItemLabelStyle={styles.dropdownItemLabel}
                placeholder="Selecciona un rol"
                placeholderStyle={styles.dropdownPlaceholder}
                textStyle={styles.inputText} // Usa el mismo estilo de texto que los inputs
                onOpen={() => setFocusedField("role")}
                onClose={() => setFocusedField("")}
                zIndex={1000}
            />
        </View>

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
            renderItem={({item}) => item}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
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


    // DropDown
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#8F9BB3", // Color del label PARA QUE SE VEA IGUAL QUE LOS INPUTS
        marginBottom: 5, // Espacio entre el label y el dropdown
    },
    dropdown: {
        height: 50, // Altura igual a la de los otros inputs
        backgroundColor: "#F9FAFB", // Fondo claro
        borderColor: "#E8ECEF", // Borde suave
        borderWidth: 1,
        borderRadius: 12, // Bordes redondeados más pronunciados
        paddingHorizontal: 15, // Padding horizontal igual que los inputs
        marginBottom: 30, // Margen inferior igual que los inputs
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
        color: "#1A2138", // Color de texto igual que inputs
        paddingVertical: 50, // Espaciado interno items
    },
    dropdownPlaceholder: {
        color: "#8F9BB3", // Color placeholder igual que inputs
        fontSize: 16,
    },
    dropdownViewContainer:{
        maxWidth: "90%",
        marginHorizontal: "auto", // Centra el formulario automáticamente
    }
});