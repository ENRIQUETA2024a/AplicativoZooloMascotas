import React, {useState} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Icon, Input, Text } from "@ui-kitten/components";
import {MyInput} from "../ui/MyInput";

interface Props {
    form: any;
    isEditMode: boolean;
    onChange: (field: string, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    borderColorInput?:string;
}

export const OwnerForm = ({ form, isEditMode, onChange, onSave, onCancel,borderColorInput="#3366FF" }: Props) => {
    const [focusedField, setFocusedField] = useState("");
    const defaultBorderColorInput="#8F9BB3";
    return (
        <ScrollView
            contentContainerStyle={styles.modalScroll}
            showsVerticalScrollIndicator={false}
        >

            <MyInput
                labelInput="Nombres *"
                valueInput={form.names}
                onChangeText={(text) => onChange("names", text)}
                styleInput={[
                    focusedField === "names" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("names")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="names" ?  borderColorInput :defaultBorderColorInput}

                placeHolderInput={"Ej. Juan"}
                iconName={"person-outline"}
            />

            <MyInput
                labelInput="Apellidos *"
                valueInput={form.surnames}
                onChangeText={(text) => onChange("surnames", text)}
                styleInput={[
                    focusedField === "surnames" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("surnames")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="surnames" ?  borderColorInput :defaultBorderColorInput}

                placeHolderInput={"Ej. Perez"}
                iconName={"person-outline"}
            />

            <MyInput
                labelInput="Tipo de Documento *"
                valueInput={form.type_document}
                onChangeText={(text) => onChange("type_document", text)}
                styleInput={[
                    focusedField === "type_document" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("type_document")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="type_document" ?  borderColorInput :defaultBorderColorInput}

                iconName={"file-text-outline"}
                placeHolderInput={"Ej. CC"}
            />


            <MyInput
                labelInput="Número de Documento *"
                valueInput={form.n_document}
                onChangeText={(text) => onChange("n_document", text)}
                styleInput={[
                    focusedField === "n_document" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("n_document")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="n_document" ?  borderColorInput :defaultBorderColorInput}

                iconName={"hash-outline"}
                placeHolderInput={"Ej. 12345678"}

                keyboardType={"numeric"}
            />

            <MyInput
                labelInput="Correo Electrónico"
                valueInput={form.email}
                onChangeText={(text) => onChange("email", text)}
                styleInput={[
                    focusedField === "email" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="email" ?  borderColorInput :defaultBorderColorInput}

                iconName={"email-outline"}
                placeHolderInput={"Ej. juan@gmail.com"}

                keyboardType={"email-address"}
            />

            <MyInput
                labelInput="Teléfono *"
                valueInput={form.phone}
                onChangeText={(text) => onChange("phone", text)}
                styleInput={[
                    focusedField === "phone" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="phone" ?  borderColorInput :defaultBorderColorInput}

                iconName={"phone-outline"}
                placeHolderInput={"Ej. 987654321"}

                keyboardType={"phone-pad"}
            />

            <MyInput
                labelInput="Dirección"
                valueInput={form.address}
                onChangeText={(text) => onChange("address", text)}
                styleInput={[
                    focusedField === "address" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="address" ?  borderColorInput :defaultBorderColorInput}

                iconName={"home-outline"}
                placeHolderInput={"Ej. Av. Larco Mar N-9"}
                multiline={true}
            />


            <MyInput
                labelInput="Ciudad"
                valueInput={form.city}
                onChangeText={(text) => onChange("city", text)}
                styleInput={[
                    focusedField === "city" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("city")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="city" ?  borderColorInput :defaultBorderColorInput}

                iconName={"navigation-2-outline"}
                placeHolderInput={"Ej. Cusco"}
            />

            <MyInput
                labelInput="Contacto de Emergencia"
                valueInput={form.emergency_contact}
                onChangeText={(text) => onChange("emergency_contact", text)}
                styleInput={[
                    focusedField === "emergency_contact" && { borderColor: borderColorInput }, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("emergency_contact")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField==="emergency_contact" ?  borderColorInput :defaultBorderColorInput}

                iconName={"alert-circle-outline"}
                placeHolderInput={"Ej. Cusco"}
                keyboardType={"default"}
                multiline={true}
            />



            <View style={styles.modalActions}>
                <Button
                    status="basic"
                    appearance="outline"
                    onPress={onCancel}
                    style={styles.modalButton}
                    accessoryLeft={<Icon name="close-outline" />}
                >
                    Cancelar
                </Button>
                <Button
                    status={!isEditMode ? "success" : "warning"}
                    onPress={onSave}
                    style={styles.modalButton}
                    accessoryLeft={<Icon name="save-outline" />}
                >
                    {!isEditMode ? "Guardar" : "Actualizar"}
                </Button>
            </View>
            <Text style={styles.footerText} appearance="hint">
                * Campos obligatorios
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
});