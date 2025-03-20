import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import { useDashboardMetrics } from "../../components/hooks/useDashboardMetrics";
import { MyActivityIndicator } from "../../components/ui/MyActivityIndicator";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";

export const SuperAdminScreen = () => {
    const navigation = useNavigation<NavigationProp<MyRootStackScreens>>();
    const { metrics, loading, error, refreshMetrics } = useDashboardMetrics();

    if (loading) {
        return <MyActivityIndicator />;
    }

    if (error) {
        return (
            <Layout style={styles.errorContainer}>
                <Text category="h6" status="danger" style={styles.errorText}>
                    Ocurrió un error al cargar los datos.
                </Text>
                <Button
                    style={styles.retryButton}
                    status="primary"
                    accessoryLeft={(props) => <Icon {...props} name="refresh-outline" />}
                    onPress={refreshMetrics}
                >
                    Reintentar
                </Button>
            </Layout>
        );
    }

    if (!metrics) {
        return (
            <Layout style={styles.errorContainer}>
                <Text category="h6" status="warning" style={styles.errorText}>
                    No hay métricas disponibles.
                </Text>
            </Layout>
        );
    }

    // Datos para las métricas con validación segura
    const metricData = [
        { title: "Total Usuarios", value: metrics?.total_users ?? 0, icon: "people-outline", color: "#1ABC9C",screen: "UserList" },
        { title: "Total Dueños", value: metrics?.total_owners ?? 0, icon: "person-outline", color: "#3498DB" ,screen: "OwnerAdminScreen"},
        { title: "Total Mascotas", value: metrics?.total_pets ?? 0, icon: "behance-outline", color: "#F39C12" ,screen: ""},
        { title: "Total Citas", value: metrics?.total_appointments ?? 0, icon: "calendar-outline", color: "#9B59B6",screen: "" },
        { title: "Total Cirugías", value: metrics?.total_surgeries ?? 0, icon: "scissors-outline", color: "#E74C3C" ,screen: ""},
        { title: "Citas Pagadas", value: metrics?.total_appointment_payments ?? 0, icon: "credit-card-outline", color: "#2ECC71" ,screen: ""},
        { title: "Cirugías Pagadas", value: metrics?.total_surgerie_payments ?? 0, icon: "credit-card-outline", color: "#27AE60" ,screen: ""},
        { title: "Vacunaciones Pagadas", value: metrics?.total_vaccination_payments ?? 0, icon: "activity-outline", color: "#16A085" ,screen: ""},
        { title: "Citas Programadas", value: metrics?.appointments_schedule ?? 0, icon: "clock-outline", color: "#8E44AD" ,screen: ""},
        { title: "Citas Reprogramadas", value: metrics?.appointments_reschedule ?? 0, icon: "refresh-outline", color: "#D35400" ,screen: ""},
        { title: "Pagos Pendientes", value: metrics?.appointments_statepayment_pending ?? 0, icon: "alert-circle-outline", color: "#E67E22" ,screen: ""},
        { title: "Pagos Parciales", value: metrics?.appointments_statepayment_partial ?? 0, icon: "pie-chart-outline", color: "#F1C40F" ,screen: ""},
        { title: "Pagos Completos", value: metrics?.appointments_statepayment_complete ?? 0, icon: "checkmark-circle-outline", color: "#27AE60" ,screen: ""},
    ];

    const renderMetricItem = ({ item }) => (
        <TouchableOpacity  activeOpacity={0.7} onPress={() => navigation.navigate(item.screen)}>
            {/*onPress={() => navigation.navigate(item.screen)}    */}
            <View style={[styles.metricCard, { backgroundColor: item.color }]}>
                <Icon name={item.icon} style={styles.metricIcon} fill="#FFF" />
                <Text category="h6" style={styles.metricValue}>{item.value}</Text>
                <Text category="s1" style={styles.metricTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Layout style={styles.container}>
            <FlatList
                data={metricData}
                renderItem={renderMetricItem}
                keyExtractor={(item) => item.title}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        marginBottom: 10,
    },
    listContent: {
        padding: 15,
    },
    columnWrapper: {
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    metricCard: {
        flex: 1,
        margin: 5,
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        minWidth: "45%",
    },
    metricIcon: {
        width: 24,
        height: 24,
        marginBottom: 5,
    },
    metricValue: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 5,
    },
    metricTitle: {
        color: "#FFF",
        fontSize: 14,
        textAlign: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFF",
    },
    errorText: {
        textAlign: "center",
        marginBottom: 20,
    },
    retryButton: {
        borderRadius: 10,
        paddingHorizontal: 20,
    },
});
