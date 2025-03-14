import {RouteProp, useRoute} from "@react-navigation/native";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {useEffect, useState} from "react";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {ScrollView, StyleSheet, Text} from "react-native";
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
                console.error("Error al obtener las vacunas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVaccines();
    }, [idPet]);

    if (loading) return <MyActivityIndicator/>;
    if (!vaccines) return <Text>No se encontró vacunas</Text>;

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
    }
});