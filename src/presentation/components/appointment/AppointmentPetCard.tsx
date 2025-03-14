import { Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import {Appointment} from "../../../core";

interface Props {
    appointment: Appointment;
}

export const AppointmentPetCard = ({ appointment }: Props) => {
    // Formatear la fecha de manera más corta y legible
    const formatDate = (date: Date, day: string) => {
        const dateObj = new Date(date);
        return `${day.charAt(0).toUpperCase() + day.slice(1)}, ${dateObj.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short", // Mes abreviado
            year: "numeric",
        })}`;
    };

    // Formatear hora si está disponible
    const formatTime = () => {
        return appointment.hour_start && appointment.hour_end
            ? `${appointment.hour_start} - ${appointment.hour_end}`
            : "Sin horario";
    };

    return (
        <Card style={styles.card}>
            {/* Encabezado */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon name="calendar-outline" style={styles.icon} fill="#3366FF" />
                    <Text category="h6" style={styles.date}>
                        {formatDate(appointment.date_appointment, appointment.day)}
                    </Text>
                </View>
                <View style={styles.rescheduleBadge}>
                    <Text style={styles.rescheduleText} status={getStatusColor(appointment.reschedule)}>
                        {appointment.reschedule}
                    </Text>
                </View>
            </View>

            {/* Detalles */}
            <View style={styles.detailsContainer}>
                <DetailItem label="⏰ Hora" value={formatTime()} />
                <DetailItem label="👩‍⚕️ Veterinario" value={appointment.veterinary} />
                <DetailItem label="💳 Pago" value={`${appointment.state_pay} (S/ ${appointment.amount})`} />
                <DetailItem label="📌 Estado" value={appointment.state} status={appointment.state} />
            </View>

            {/* Motivo */}
            <View style={styles.reasonContainer}>
                <Text category="label" style={styles.label}>📖 Motivo</Text>
                <Text style={styles.reasonText} numberOfLines={3} ellipsizeMode="tail">
                    {appointment.reason}
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

/** Función para colores de reprogramación */
const getStatusColor = (status?: string) => {
    switch (status) {
        case "Reprogramado":
            return "danger";
        case "Programado":
            return "success";
        default:
            return "basic";
    }
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,


        backgroundColor: "#f9f9f9",
        padding: 1,


        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    date: {
        fontWeight: "bold",
        fontSize: 16, // Reducido para que sea más compacto
        color: "#333",
    },
    rescheduleBadge: {
       // backgroundColor: "#f0f0f0",
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    rescheduleText: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
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