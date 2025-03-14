import { Pet } from "../../../core/pet/Pet";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getPetById } from "../../../actions";
import { MyActivityIndicator } from "../ui/MyActivityIndicator";
import { Avatar, Button, Card, Icon, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { MyRootStackScreens } from "../../navigation/MyRootStackScreens";

type PetDetailsScreenRouteProp = RouteProp<MyRootStackScreens, "PetDetailsScreen">;

export const PetDetail = () => {
    const navigation = useNavigation<NavigationProp<MyRootStackScreens>>();
    const route = useRoute<PetDetailsScreenRouteProp>();
    const { idPet } = route.params;
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

    if (loading) return <MyActivityIndicator />;
    if (!pet) return <Text>No se encontró la mascota</Text>;

    return (
        <Card style={styles.card}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Encabezado con foto y nombre */}
                <View style={styles.header}>
                    <Avatar style={styles.avatar} size="giant" source={{ uri: pet.photo }} />
                    <Text category="h6" style={styles.petName}>
                        {pet.name}
                    </Text>
                </View>

                <View style={styles.divider} />

                {/* Contenido en 3 columnas */}
                <View style={styles.content}>
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
                    <View style={styles.column}>
                        <Text category="label" appearance="hint" style={styles.label}>
                            Peso
                        </Text>
                        <Text style={styles.value}>{pet.weight} kg</Text>
                        <Text category="label" appearance="hint" style={styles.label}>
                            Nacimiento
                        </Text>
                        <Text style={styles.value}>
                            {pet.birth_date
                                ? new Date(pet.birth_date).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : "Sin fecha"}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Sección de notas médicas */}
                <View style={styles.notesSection}>
                    <Text category="label" style={styles.label}>
                        Notas Médicas
                    </Text>
                    <Text style={styles.notesValue}>
                        {pet.medical_notes || "Sin observaciones"}
                    </Text>
                </View>

                <View style={styles.divider} />

                {/* Sección de botones */}
                <View style={styles.buttonSection}>
                    {/* Botón de Citas */}
                    <Button
                        style={styles.button}
                        appearance="filled"
                        status="danger" // Rojo para urgencia de citas
                        accessoryLeft={<Icon name="calendar-outline"  />}
                        onPress={() => navigation.navigate("AppointmentPetListScreen", { idPet })}
                    >
                        {evaProps => <Text {...evaProps} style={styles.buttonText}>Citas</Text>}
                    </Button>

                    {/* Botón de Vacunas */}
                    <Button
                        style={styles.button}
                        appearance="filled"
                        status="success" // Verde para salud/preventivo
                        accessoryLeft={<Icon name="heart-outline"/>}
                        onPress={() => navigation.navigate("VaccinePetListScreen", { idPet })}
                    >
                        {evaProps => <Text {...evaProps} style={styles.buttonText}>Vacunas</Text>}
                    </Button>

                    {/* Botón de Cirugías */}
                    <Button
                        style={styles.button}
                        appearance="filled"
                        status="info" // Azul para procedimientos específicos
                        accessoryLeft={<Icon name="scissors-outline"  />}
                        onPress={() => navigation.navigate("SurgeryPetListScreen", { idPet })}
                    >
                        {evaProps => <Text {...evaProps} style={styles.buttonText}>Cirugías</Text>}
                    </Button>
                </View>
            </ScrollView>
        </Card>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    card: {
        margin: 15,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderColor: "#E8ECEF",
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
        padding: 20,
        backgroundColor: "#F9FAFB",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    avatar: {
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#4CAF50",
        marginRight: 15,
    },
    petName: {
        color: "#1A2138",
        fontWeight: "bold",
        fontSize: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#E8ECEF",
        marginHorizontal: 20,
    },
    content: {
        flexDirection: "row",
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
    column: {
        flex: 1,
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 12,
        color: "#8F9BB3",
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        color: "#2E3A59",
        marginBottom: 10,
        fontWeight: "500",
    },
    notesSection: {
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
    notesValue: {
        fontSize: 14,
        color: "#4B5EAA",
        lineHeight: 20,
    },
    buttonSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        //paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#F9FAFB",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    button: {
        flex: 1, // Cada botón ocupa el mismo espacio
        marginHorizontal: 4, // Espacio entre botones
        borderRadius: 15,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        width: '30%',
        elevation: 4,

    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: -8,
    },
});

