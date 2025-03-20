import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Input} from "@ui-kitten/components";

interface Props {
    form: any,
    isEditMode: any,
    onChange: any,
    onSave: any,
    onCancel: any,
}

// Componente de Formulario de Dueño
export const OwnerForm = ({
                              form,
                              isEditMode,
                              onChange,
                              onSave,
                              onCancel,
                          }: Props) => (
    <ScrollView contentContainerStyle={styles.modalScroll}>
        <Input
            label="Nombres *"
            value={form.names}
            onChangeText={(text) => onChange("names", text)}
            style={styles.input}
        />
        <Input
            label="Apellidos *"
            value={form.surnames}
            onChangeText={(text) => onChange("surnames", text)}
            style={styles.input}
        />
        <Input
            label="Tipo de Documento *"
            value={form.type_document}
            onChangeText={(text) => onChange("type_document", text)}
            style={styles.input}
        />
        <Input
            label="Número de Documento *"
            value={form.n_document}
            onChangeText={(text) => onChange("n_document", text)}
            keyboardType="numeric"
            style={styles.input}
        />
        <Input
            label="Correo Electrónico"
            value={form.email}
            onChangeText={(text) => onChange("email", text)}
            keyboardType="email-address"
            style={styles.input}
        />
        <Input
            label="Teléfono *"
            value={form.phone}
            onChangeText={(text) => onChange("phone", text)}
            keyboardType="phone-pad"
            style={styles.input}
        />
        <Input
            label="Dirección"
            value={form.address}
            onChangeText={(text) => onChange("address", text)}
            style={styles.input}
        />
        <Input
            label="Ciudad"
            value={form.city}
            onChangeText={(text) => onChange("city", text)}
            style={styles.input}
        />
        <Input
            label="Contacto de Emergencia"
            value={form.emergency_contact}
            onChangeText={(text) => onChange("emergency_contact", text)}
            keyboardType="phone-pad"
            style={styles.input}
        />
        <View style={styles.modalActions}>
            <Button
                status="basic"
                onPress={onCancel}
                style={styles.modalButton}
            >
                Cancelar
            </Button>
            <Button
                status="success"
                onPress={onSave}
                style={styles.modalButton}
            >
                Guardar
            </Button>
        </View>
    </ScrollView>
);

const styles=StyleSheet.create({
    modalScroll: {
        paddingBottom: 10,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    input: {
        marginBottom: 15,
        borderRadius: 10,
    },
})