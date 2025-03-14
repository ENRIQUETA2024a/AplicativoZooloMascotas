import { Vaccine } from "../../../core/vaccine/Vaccine";
import { Card, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

interface Props {
    vaccine: Vaccine;
}

export const VaccinePetCard = ({ vaccine }: Props) => {
    // Función para formatear la fecha de manera más legible
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Card style={styles.card}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text category="h6" style={styles.title} numberOfLines={2}>
                    {/*{vaccine.vaccine_names.split(" ").slice(0, 3).join(" ") + "..."}*/}
                    {vaccine.vaccine_names}
                </Text>
                <Text category="s1" style={styles.veterinary}>
                    🩺 {vaccine.veterinary}
                </Text>
            </View>

            {/* Detalles */}
            <View style={styles.detailsContainer}>
                <DetailItem label="📅 Día" value={vaccine.day.charAt(0).toUpperCase() + vaccine.day.slice(1)} />
                <DetailItem label="📆 Fecha" value={formatDate(vaccine.date_appointment)} />
                <DetailItem
                    label="⏳ Próxima Dosis"
                    value={vaccine.next_due_date !== "undefined" ? vaccine.next_due_date : "No asignada"}
                />
                <DetailItem label="📌 Estado" value={vaccine.state} status={vaccine.state} />
                <DetailItem label="🏥 Tipo" value={vaccine.outside} />
                <DetailItem label="🔄 Reprogramación" value={vaccine.reschedule} status={vaccine.reschedule} />
                <DetailItem label="💳 Pago" value={`${vaccine.state_pay} (S/ ${vaccine.amount})`} />
            </View>

            {/* Motivo */}
            <View style={styles.reasonContainer}>
                <Text category="label" style={styles.label}>📖 Motivo</Text>
                <Text style={styles.reasonText} numberOfLines={5} ellipsizeMode="tail">
                    {vaccine.reason}
                </Text>
            </View>
        </Card>
    );
};

/** Componente reutilizable para mostrar cada detalle */
const DetailItem = ({ label, value, status }: { label: string; value: string; status?: string }) => {
    const getStatusColor = (status?: string) => {
        switch (status) {
            case "Pendiente":
                return "warning";
            case "Cancelado":
                return "danger";
            case "Atendido":
                return "success";
            case "Programado":
                return "primary";
            case "Reprogramado":
                return "info";
            default:
                return "basic";
        }
    };

    return (
        <View style={styles.detailItem}>
            <Text category="label" style={styles.label}>
                {label}
            </Text>
            <Text status={getStatusColor(status)} style={styles.detailValue}>
                {value}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 10,
        marginBottom: 15,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#333",
    },
    veterinary: {
        fontSize: 14,
        color: "#888",
        marginTop: 2,
    },
    detailsContainer: {
        marginBottom: 15,
    },
    detailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "500",
    },
    reasonContainer: {
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 10,
    },
    reasonText: {
        color: "#555",
        fontSize: 13,
        lineHeight: 18,
    },
    label: {
        fontWeight: "600",
        color: "#666",
        marginBottom: 5,
    },
});
