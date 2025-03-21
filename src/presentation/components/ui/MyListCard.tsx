import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Button, Card, Icon, Text } from "@ui-kitten/components";

interface Attribute {
    label: string;
    value: string | number | undefined;
    icon?: string;
    iconColor?: string;
}

interface MyListCardProps {
    attributes: Attribute[];
    iconName?: string;
    iconColor?: string;
    style?: StyleProp<ViewStyle>;
    onEdit?: () => void;
    onDelete?: () => void;
    onToggleActive?: () => void;
    isActive?: boolean;
}

export const MyListCard = ({
                               attributes,
                               iconName,
                               iconColor = "#3366FF",
                               style,
                               onEdit,
                               onDelete,
                               onToggleActive,
                               isActive = true, // Por defecto activo
                           }: MyListCardProps) => {
    return (
        <Card style={[styles.card, style, isActive && styles.deletedCard]}>
            <View style={styles.cardContent}>
                {/* Contenedor del Ícono Principal */}
                {iconName && (
                    <View style={styles.iconContainer}>
                        <Icon name={iconName} fill={!isActive ? iconColor :"#A6C1FF"} style={styles.icon}  />
                        {/* Botón Activar/Desactivar en la esquina derecha */}
                        {onToggleActive && isActive && (
                            <Button
                                appearance="ghost"
                                status={isActive ? "success" : "warning"}
                                accessoryLeft={
                                    <Icon name={isActive ? "checkmark-circle-outline" : "close-circle-outline"} />
                                }
                                onPress={onToggleActive}
                                style={styles.toggleButton}

                            >
                                {/*{isActive ? "Desactivar" : "Activar"}*/}
                            </Button>
                        )}
                    </View>
                )}

                {/* Contenido del Card */}
                <View style={styles.content}>
                    {attributes.map((attr, index) => (
                        <View key={index} style={styles.attributeContainer}>
                            {attr.icon && (
                                <Icon
                                    name={attr.icon}
                                    style={styles.attributeIcon}
                                    //fill={   attr.iconColor || iconColor}
                                    fill={ !isActive ? iconColor : "#A6C1FF" }
                                />
                            )}
                            <Text category="s2" appearance="hint" style={styles.attributeLabel}>
                                {attr.label}:
                            </Text>
                            <Text category="s1" style={styles.attributeValue}>
                                {attr.value ?? "N/A"}
                            </Text>
                        </View>
                    ))}
                </View>


            </View>

            {/* Botones de Acción (Editar y Eliminar) */}
            {(onEdit || onDelete) && (
                <View style={styles.actionsContainer}>
                    {onEdit && (
                        <Button
                            appearance="ghost"
                            status={"warning"}
                            accessoryLeft={<Icon name="edit-outline" />}
                            onPress={onEdit}
                            style={styles.actionButton}
                            disabled={isActive}
                        >
                            Editar
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            appearance="ghost"
                            status="danger"
                            accessoryLeft={<Icon name="trash-2-outline" />}
                            onPress={onDelete}
                            style={styles.actionButton}
                            disabled={isActive}
                        >
                            Eliminar
                        </Button>
                    )}
                </View>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        position: "relative", // Para posicionar el botón toggle en la esquina
        padding: 15,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E8ECEF",
    },
    deletedCard: {
        backgroundColor: "#F2F2F2",
        borderColor: "#E74C3C",
        opacity: 0.85,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    iconContainer: {
        marginRight: 7,
        justifyContent: "space-between", // Centra verticalmente
        alignItems: "center", // Centra horizontalmente
        //backgroundColor: "#FFFFFF", // Fondo gris claro F1F3F5
        borderRadius: 10,
        padding: 5,
        width: 28, // Tamaño fijo para consistencia
        height: 28,
    },
    icon: {
        width: 28,
        height: 28,
    },
    content: {
        flex: 1,
    },
    attributeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    attributeIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    attributeLabel: {
        fontSize: 14,
        color: "#8F9BB3",
        marginRight: 6,
        fontWeight: "500",
    },
    attributeValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A2138",
        flex: 1,
    },
    toggleButton: {
        // position: "absolute",
        top: -5, // Ajusta para alinear con el borde superior
        right: -5, // Ajusta para alinear con el borde derecho
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#E8ECEF",
        gap: 5,
    },
    actionButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
});