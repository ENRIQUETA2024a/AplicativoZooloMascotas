import { StyleSheet, Text, View } from "react-native";

export const MetricCard = ({ title, value, color }) => {
    return (
        <View style={[styles.metricCard, { backgroundColor: color }]}>
            <Text style={styles.metricTitle}>{title}</Text>
            <Text style={styles.metricValue}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    metricCard: {
        flex: 1,
        minWidth: "48%",
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
    },
    metricTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
});