import {ScrollView, StyleSheet, Text, View} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {getSurgeriesByPetId} from "../../../actions";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {SurgeryPetCard} from "../../components/surgery/SurgeryPetCard";
import {MyActivityIndicator} from "../../components";

type PetDetailsScreenRouteProp = RouteProp<MyRootStackScreens, "PetDetailsScreen">

export const SurgeryPetListScreen = () => {
    const route = useRoute<PetDetailsScreenRouteProp>();
    const {idPet} = route.params;
    const [surgeries, setSurgery] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurgeries = async () => {
            try {
                const petData = await getSurgeriesByPetId(idPet);
                setSurgery(petData);
            } catch (error) {
                console.error("Error al obtener las cirugias:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurgeries();
    }, [idPet]);

    if (loading) return <MyActivityIndicator/>;
    if (!surgeries) return <Text>No se encontró cirugias</Text>;


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {surgeries.map((surgery, index) => (
                <SurgeryPetCard key={index} surgery={surgery}/>
            ))}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
});