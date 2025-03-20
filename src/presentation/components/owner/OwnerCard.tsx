import React from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { OwnerDashboard } from "../../../core";

interface Props {
    owner: OwnerDashboard;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const OwnerCard = ({ owner, onEdit, onDelete }: Props) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Card style={styles.ownerCard}>
                    {/* Encabezado de la tarjeta */}
                    <View style={styles.cardHeader}>
                        <Text category="h6" style={styles.ownerName}>
                            {owner.names} {owner.surnames}
                        </Text>
                        <Text category="s2" appearance="hint" style={styles.ownerDocument}>
                            {owner.type_document}: {owner.n_document}
                        </Text>
                    </View>

                    {/* Información de contacto */}
                    <View style={styles.cardContent}>
                        <View style={styles.infoRow}>
                            <Icon name="email-outline" fill="#8F9BB3" style={styles.icon} />
                            <Text category="p2" appearance="hint" style={styles.infoText}>
                                {owner.email || "Sin correo"}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="phone-outline" fill="#8F9BB3" style={styles.icon} />
                            <Text category="p2" appearance="hint" style={styles.infoText}>
                                {owner.phone}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="home-outline" fill="#8F9BB3" style={styles.icon} />
                            <Text category="p2" appearance="hint" style={styles.infoText}>
                                {owner.address || "Sin dirección"}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="alert-circle-outline" fill="#8F9BB3" style={styles.icon} />
                            <Text category="p2" appearance="hint" style={styles.infoText}>
                                Contacto de emergencia: {owner.emergency_contact || "No registrado"}
                            </Text>
                        </View>
                    </View>

                    {/* Acciones de la tarjeta */}
                    <View style={styles.cardActions}>
                        <Button
                            appearance="ghost"
                            status="primary"
                            accessoryLeft={<Icon name="edit-outline" />}
                            onPress={() => onEdit(owner.id)}
                            style={styles.actionButton}
                        />
                        <Button
                            appearance="ghost"
                            status="danger"
                            accessoryLeft={<Icon name="trash-2-outline" />}
                            onPress={() => onDelete(owner.id)}
                            style={styles.actionButton}
                        />
                    </View>
                </Card>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ownerCard: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
        paddingBottom: 12,
        marginBottom: 12,
    },
    ownerName: {
        color: "#1A2138",
        fontWeight: "bold",
        marginBottom: 4,
    },
    ownerDocument: {
        color: "#8F9BB3",
    },
    cardContent: {
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    infoText: {
        flex: 1,
        color: "#8F9BB3",
    },
    cardActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        borderTopWidth: 1,
        borderTopColor: "#E8ECEF",
        paddingTop: 12,
        marginTop: 12,
    },
    actionButton: {
        marginHorizontal: 4,
    },
});