import { Appointment } from "../../../core/appointment/Appointment";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

interface Props {
    appointment: Appointment;
}

export const AppointmentPetCard = ({ appointment }: Props) => {
    return (
        <Card key={appointment.id} style={styles.card}>
            {/* Encabezado */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon name="calendar-outline" style={styles.icon} fill="#3366FF" />
                    <Text category="h6" style={styles.date}>
                        {appointment.day}, {new Date(appointment.date_appointment).toLocaleDateString("es-ES")}
                    </Text>
                </View>
                <DetailItemReschedule label={""} value={appointment.reschedule} status={appointment.reschedule} />
            </View>

            {/* Detalles */}
            <View style={styles.detailsContainer}>
                <DetailItem label="⏰ Hora" value={`${appointment.hour_start} - ${appointment.hour_end}`} />
                <DetailItem label="👩‍⚕️ Veterinario" value={appointment.veterinary} />
                <DetailItem label="💳 Pago" value={`${appointment.state_pay} (S/ ${appointment.amount})`} />
                <DetailItem label="📌 Estado" value={appointment.state} status={appointment.state} />
            </View>

            {/* Motivo con truncado */}
            <View style={styles.reasonContainer}>
                <Text category="label" style={styles.label}>📖 Motivo:</Text>
                <Text style={styles.reasonText} numberOfLines={5} ellipsizeMode="tail">
                    {appointment.reason}
                </Text>
            </View>
        </Card>
    );
};

/** Componente reutilizable para mostrar cada detalle */
const DetailItem = ({ label, value, status }: { label: string; value: string; status?: string }) => {
    const statusColor = status === "Pendiente" ? "warning" : status === "Cancelado" ? "danger" : "success";
    return (
        <View style={styles.detailItem}>
            <Text category="label" style={styles.label}>{label}:</Text>
            <Text status={status ? statusColor : "basic"}>{value}</Text>
        </View>
    );
};

/** Componente reutilizable para mostrar cada detalle de RESCHEDULE */
const DetailItemReschedule = ({ label, value, status }: { label: string; value: string; status?: string }) => {
    const statusColor = status === "Reprogramado" ? "danger" : "success";
    return (
        <View style={styles.detailItem}>
            <Text category="label" style={styles.label}>{label}</Text>
            <Text status={status ? statusColor : "basic"}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    date: {
        fontWeight: "bold",
    },
    detailsContainer: {
        marginBottom: 10,
    },
    detailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 3,
    },
    reasonContainer: {
        marginBottom: 10,
    },
    reasonText: {
        color: "#555",
        fontSize: 14,
    },
    label: {
        fontWeight: "bold",
        color: "#666",
    },
});
