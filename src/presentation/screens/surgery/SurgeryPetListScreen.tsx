import {ScrollView, StyleSheet, Text, View} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {getAppointmentsByPetId, getSurgeriesByPetId} from "../../../actions";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {AppointmentPetCard} from "../../components/appointment/AppointmentPetCard";
import {SurgeryPetCard} from "../../components/surgery/SurgeryPetCard";

type PetDetailsScreenRouteProp = RouteProp<MyRootStackScreens, "PetDetailsScreen">

export const SurgeryPetListScreen = () => {
    const route = useRoute<PetDetailsScreenRouteProp>();
    const {idPet} = route.params;
    const [surgeries, setSurgery] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const petData = await getSurgeriesByPetId(idPet);
                setSurgery(petData);
            } catch (error) {
                console.error("Error al obtener las cirugias:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [idPet]);

    if (loading) return <MyActivityIndicator/>;
    if (!surgeries) return <Text>No se encontró citas</Text>;


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