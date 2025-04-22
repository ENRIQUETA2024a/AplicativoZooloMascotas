import {RouteProp, useRoute} from "@react-navigation/native";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {useEffect, useState} from "react";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {getVaccinationsByPetId} from "../../../actions/vaccine/vaccinesListActions";
import {VaccinePetCard} from "../../components/vaccine/VaccinePetCard";


type PetDetailsScreenRouteProp = RouteProp<MyRootStackScreens, "PetDetailsScreen">

export const VaccinePetListScreen=() =>{

    const route = useRoute<PetDetailsScreenRouteProp>();
    const {idPet} = route.params;
    const [vaccines, setVaccine] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                const petData = await getVaccinationsByPetId(idPet);
                setVaccine(petData);
            } catch (error) {
                console.warn("Error al obtener las vacunas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVaccines();
    }, [idPet]);

    if (loading) return <MyActivityIndicator/>;
    if (vaccines.length ===0) return(<View style={styles.container}>
        <Text style={styles.noVaccineText}>
            No hay vacunas registradas para esta mascota.
        </Text>
    </View>);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {vaccines.map((vaccine, index) => (
                <VaccinePetCard key={index} vaccine={vaccine} />
            ))}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    noVaccineText: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 30,
        color: "gray",
    }
});