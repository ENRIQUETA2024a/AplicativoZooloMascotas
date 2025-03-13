import { Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { Surgery } from "../../../core/surgeries/Surgery";

interface Props {
    surgery: Surgery;
}

export const SurgeryPetCard = ({ surgery }: Props) => {
    return (
        <Card style={styles.card}>
            {/* Encabezado */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon name="calendar-outline" style={styles.icon} fill="#3366FF" />
                    <Text category={"h6"} style={styles.headerText}>
                        {surgery.day}, {new Date(surgery.date_appointment).toLocaleDateString("es-ES")}
                    </Text>
                </View>
                <DetailItemReschedule label="" value={surgery.reschedule} status={surgery.reschedule} />
            </View>

            {/* Separador */}
            <View style={styles.divider} />

            {/* Detalles */}
            <View style={styles.detailsContainer}>
                <DetailItem label="⚕️ Tipo" value={surgery.surgerie_type} />
                <DetailItem label="👩‍⚕️ Veterinario" value={surgery.veterinary} />
                <DetailItem label="🏥 Procedimiento" value={surgery.outside} />
                <DetailItem label="📌 Estado" value={surgery.state} status={surgery.state} />
                <DetailItem label="💳 Pago" value={`${surgery.state_pay} (S/ ${surgery.amount})`} />
            </View>

            {/* Separador */}
            <View style={styles.divider} />

            {/* Notas médicas */}
            <View style={styles.notesContainer}>
                <Text category="label" style={styles.label}>📝 Notas Médicas</Text>
                <Text style={styles.notesText} numberOfLines={5} ellipsizeMode="tail">
                    {surgery.medical_notes || "Sin notas disponibles"}
                </Text>
            </View>
        </Card>
    );
};

const DetailItem = ({ label, value, status }: { label: string; value: string; status?: string }) => {
    const statusColor =
        status === "Pendiente" ? "warning" : // Amarillo
            status === "Cancelado" ? "danger" :  // Rojo
                status === "Atendido" ? "success" :  // Verde
                    "basic";                             // Gris por defecto
    return (
        <View style={styles.detailItem}>
            <Text category="label" style={styles.label}>{label}</Text>
            <Text style={styles.detailValue} status={statusColor}>
                {value}
            </Text>
        </View>
    );
};

const DetailItemReschedule = ({ label, value, status }: { label: string; value: string; status?: string }) => {
    const statusColor = status === "Reprogramado" ? "danger" : "success"; // Rojo para Reprogramado, Verde para otros
    return (
        <View style={styles.detailItem}>
            <Text category="label" style={styles.label}>{label}</Text>
            <Text style={styles.detailValue} status={statusColor}>
                {value}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderColor: '#E8ECEF',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: '#F9FAFB',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        color: '#1A2138',
        fontWeight: "bold",
        fontSize: 15,
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#E8ECEF',
        marginHorizontal: 20,
    },
    detailsContainer: {
        padding: 20,
    },
    detailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: "500",
    },
    notesContainer: {
        padding: 20,
        backgroundColor: '#F9FAFB',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    notesText: {
        color: '#4B5EAA',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 5,
    },
    label: {
        fontWeight: "600",
        color: '#8F9BB3',
        fontSize: 13,
    },
});