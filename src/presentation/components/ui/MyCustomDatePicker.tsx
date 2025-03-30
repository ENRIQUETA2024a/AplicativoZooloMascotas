import React, { useState } from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
interface DatePickerProps {
    label: string;
    date: Date | null; // Fecha seleccionada
    onChange: (date: Date) => void; // Función para actualizar la fecha
}

export const MyCustomDatePicker = ({ label, date, onChange }:DatePickerProps) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{label}</Text>

            {date && (
                <Text style={{ marginBottom: 5 }}>
                    Fecha seleccionada: {date.toDateString()}
                </Text>
            )}

            <Button title="Seleccionar Fecha" onPress={() => setOpen(true)} />

            {open && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setOpen(false);
                        if (selectedDate) {
                            onChange(selectedDate);
                        }
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    datePickerButton: {
        backgroundColor: "#3366FF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    datePickerButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});