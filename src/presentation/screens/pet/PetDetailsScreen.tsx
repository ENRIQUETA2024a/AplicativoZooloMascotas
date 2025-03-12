import {RouteProp, useRoute} from "@react-navigation/native";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {useState, useEffect} from "react";
import {Pet} from "../../../core/pet/Pet";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {getPetById} from "../../../actions";
import {Avatar, Card, Input, Text} from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import {MyIcon} from "../../components/ui/MyIcon";




type PetDetailsScreenRouteProp = RouteProp<MyRootStackScreens, "PetDetailsScreen">

export const PetDetailsScreen = () => {
    const route = useRoute<PetDetailsScreenRouteProp>();
    const {idPet} = route.params;
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const petData = await getPetById(idPet);
                setPet(petData);
            } catch (error) {
                console.error("Error al obtener la mascota:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [idPet]);

    if (loading) return <MyActivityIndicator/>;
    if (!pet) return <Text>No se encontró la mascota</Text>;
    return (<Card style={styles.card}>
            {/* Encabezado con foto y nombre */}
            <View style={styles.header}>
                <Avatar
                    style={styles.avatar}
                    size="giant"
                    source={{ uri: pet.photo || "https://via.placeholder.com/150" }}
                />
                <Text category="h6" style={styles.petName}>
                    {pet.name}
                </Text>
            </View>

            {/* Contenido en 3 columnas */}
            <View style={styles.content}>
                {/* Columna 1: Características principales */}
                <View style={styles.column}>
                    <Text category="label" appearance="hint" style={styles.label}>
                        Color
                    </Text>
                    <Text style={styles.value}>{pet.color}</Text>
                    <Text category="label" appearance="hint" style={styles.label}>
                        Raza
                    </Text>
                    <Text style={styles.value}>{pet.breed}</Text>
                </View>

                {/* Columna 2: Detalles biológicos */}
                <View style={styles.column}>
                    <Text category="label" appearance="hint" style={styles.label}>
                        Sexo
                    </Text>
                    <Text style={styles.value}>{pet.gender}</Text>
                    <Text category="label" appearance="hint" style={styles.label}>
                        Especie
                    </Text>
                    <Text style={styles.value}>{pet.specie}</Text>
                </View>

                {/* Columna 3: Datos numéricos */}
                <View style={styles.column}>
                    <Text category="label" appearance="hint" style={styles.label}>
                        Peso
                    </Text>
                    <Text style={styles.value}>{pet.weight} kg</Text>
                    <Text category="label" appearance="hint" style={styles.label}>
                        Nacimiento
                    </Text>
                    <Text style={styles.value}>{pet.birth_date.substring(0, 10)}</Text>
                </View>
            </View>

            {/* Sección de notas médicas */}
            <View style={styles.notesSection}>
                <Text category="label" appearance="hint" style={styles.label}>
                    Notas Médicas
                </Text>
                <Text style={styles.notesValue}>
                    {pet.medical_notes || "Sin observaciones"}
                </Text>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 15,
        borderRadius: 15,
        backgroundColor: "#F9FAFB", // Fondo gris claro suave
        borderColor: "#E8ECEF", // Borde sutil
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
    },
    avatar: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#4CAF50", // Borde verde para destacar
        marginRight: 15,
    },
    petName: {
        color: "#1A2138", // Azul oscuro elegante
        fontWeight: "bold",
    },
    content: {
        flexDirection: "row",
        padding: 15,
    },
    column: {
        flex: 1,
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 12,
        color: "#8F9BB3", // Gris suave para etiquetas
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        color: "#2E3A59", // Gris azulado para valores
        marginBottom: 10,
        fontWeight: "500",
    },
    notesSection: {
        padding: 15,
        backgroundColor: "#F1F5F9", // Fondo ligeramente diferente
        borderTopWidth: 1,
        borderTopColor: "#E8ECEF",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    notesValue: {
        fontSize: 14,
        color: "#4B5EAA", // Azul suave para notas
        lineHeight: 20,
    },
});