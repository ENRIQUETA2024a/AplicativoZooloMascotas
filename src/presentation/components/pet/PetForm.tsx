import React, {useState} from "react";
import {ScrollView, StyleSheet, View } from "react-native";
import {Button, Datepicker, Icon, Text} from "@ui-kitten/components";
import {MyInput} from "../ui/MyInput";
import {PetFormI} from "../../../core";

interface Props {
    form: PetFormI;
    isEditMode: boolean;
    onChange: (field: string, value: any) => void;
    onChangeDate?:(updatedPet: PetFormI)=>void;
    onSave: () => void;
    onCancel: () => void;
    borderColorInput?: string;
}

export const PetForm = ({onChangeDate,form, isEditMode, onChange, onSave, onCancel, borderColorInput = "#3366FF"}: Props) => {
    const [focusedField, setFocusedField] = useState("");
    const defaultBorderColorInput = "#8F9BB3";
    const [date, setDate] = useState(new Date());
    const handleFieldChange = (field: keyof PetFormI, value: string | Date) => {
        onChangeDate({ ...form, [field]: value });
    };

    return (
        <ScrollView
            contentContainerStyle={styles.modalScroll}
            showsVerticalScrollIndicator={false}
        >
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

                placeHolderInput={"Ej. Lexy"}
                iconName={"behance-outline"}
            />
            <Datepicker
                label="Fecha de Nacimiento *"
                date={new Date(form.birth_date)}
                onSelect={(nextDate) => handleFieldChange("birth_date", nextDate.toISOString())}
                style={styles.input}
                placeholder="Selecciona la fecha"
                accessoryLeft={<Icon name="calendar-outline" />}
            />
            <MyInput
                labelInput="Especie *"
                valueInput={form.specie}
                onChangeText={(text) => onChange("specie", text)}
                styleInput={[
                    focusedField === "specie" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("specie")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField === "specie" ? borderColorInput : defaultBorderColorInput}

                placeHolderInput={"Ej. Perro"}
                iconName={"copy-outline"}
            />
            <MyInput
                labelInput="Raza *"
                valueInput={form.breed}
                onChangeText={(text) => onChange("breed", text)}
                styleInput={[
                    focusedField === "breed" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("breed")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField === "breed" ? borderColorInput : defaultBorderColorInput}

                placeHolderInput={"Ej. Rottweiler"}
                iconName={"attach-2-outline"}
            />
            <MyInput
                labelInput="Genero "
                valueInput={form.gender}
                onChangeText={(text) => onChange("gender", text)}
                styleInput={[
                    focusedField === "gender" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("gender")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField === "gender" ? borderColorInput : defaultBorderColorInput}

                placeHolderInput={"Ej. M-H"}
                iconName={"cube-outline"}
            />
            <MyInput
                labelInput="Color "
                valueInput={form.color}
                onChangeText={(text) => onChange("color", text)}
                styleInput={[
                    focusedField === "color" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("color")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField === "color" ? borderColorInput : defaultBorderColorInput}

                placeHolderInput={"Ej. Negrito con tonos blancos"}
                iconName={"color-palette-outline"}
            />
            <MyInput
                labelInput="Peso "
                valueInput={form.weight}
                onChangeText={(text) => onChange("weight", text)}
                styleInput={[
                    focusedField === "weight" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("weight")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField === "weight" ? borderColorInput : defaultBorderColorInput}

                placeHolderInput={"Ej. 5 Kilos"}
                iconName={"clipboard-outline"}
            />
            <MyInput
                labelInput="Foto "
                valueInput={form.photo}
                onChangeText={(text) => onChange("photo", text)}
                styleInput={[
                    focusedField === "photo" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("photo")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField === "photo" ? borderColorInput : defaultBorderColorInput}

                placeHolderInput={""}
                iconName={"camera-outline"}
            />
            <MyInput
                labelInput="Notas Medicas "
                valueInput={form.medicalNotes}
                onChangeText={(text) => onChange("medicalNotes", text)}
                styleInput={[
                    focusedField === "medicalNotes" && {borderColor: borderColorInput}, // Cambia el color del borde al enfocar
                ]}
                onFocus={() => setFocusedField("medicalNotes")}
                onBlur={() => setFocusedField("")}
                fillColorIcon={focusedField === "medicalNotes" ? borderColorInput : defaultBorderColorInput}

                placeHolderInput={"Ej. Atencion realizada por la fecha"}
                iconName={"file-text-outline"}
                multiline={true}
            />


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
            </View>
            <Text style={styles.footerText} appearance="hint">
                * Campos obligatorios
            </Text>
        </ScrollView>
    )
}


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