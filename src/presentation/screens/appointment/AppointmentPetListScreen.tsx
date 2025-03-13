import {ScrollView, StyleSheet, Text, View} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {getAppointmentsByPetId} from "../../../actions";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {AppointmentPetCard} from "../../components/appointment/AppointmentPetCard";

type PetDetailsScreenRouteProp = RouteProp<MyRootStackScreens, "PetDetailsScreen">

export const AppointmentPetListScreen = () => {
    const route = useRoute<PetDetailsScreenRouteProp>();
    const {idPet} = route.params;
    const [appointments, setAppointment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const petData = await getAppointmentsByPetId(idPet);
                setAppointment(petData);
            } catch (error) {
                console.error("Error al obtener las citas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [idPet]);

    if (loading) return <MyActivityIndicator/>;
    if (!appointments) return <Text>No se encontró citas</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {appointments.map((appointment, index) => (
                <AppointmentPetCard key={index} appointment={appointment}/>
            ))}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
});