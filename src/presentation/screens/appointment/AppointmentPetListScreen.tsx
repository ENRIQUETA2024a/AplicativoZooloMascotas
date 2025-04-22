import {ScrollView, StyleSheet, Text, View} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {getAppointmentsByPetId} from "../../../actions";
import {AppointmentPetCard, MyActivityIndicator} from "../../components";

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
                console.warn("Error al obtener las citas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [idPet]);

    if (loading) return <MyActivityIndicator/>;
    if (appointments.length === 0) return (<View style={styles.container}>
        <Text style={styles.noAppointmentsText}>
            No hay citas registradas para esta mascota.
        </Text>
    </View>);

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
    },
    noAppointmentsText: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 30,
        color: "gray",
    }
});