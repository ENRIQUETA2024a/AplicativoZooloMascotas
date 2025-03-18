import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {MyRootStackScreens} from "./MyRootStackScreens";
import {
    NavigationProp,
    useNavigation,
} from "@react-navigation/native";
import {
    AppointmentPetListScreen, AsistenteScreen,
    HomeScreen,
    LoginScreen,
    OwnerHomeScreen, PetDetailsScreen,
    PetScreen, RecepcionScreen, SuperAdminScreen,
    SurgeryPetListScreen, UserHomeScreen,
    VaccinePetListScreen, VeterinarioScreen
} from "../screens/";


const Stack = createStackNavigator<MyRootStackScreens>();
export const MyStackNavigator = () => {
    const navigation = useNavigation<NavigationProp<MyRootStackScreens>>();
    return (
        <Stack.Navigator>
            {/*Pantalla Login*/}
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            {/*Pantalla del Dueño*/}
            <Stack.Screen
                name="OwnerHomeScreen"
                component={OwnerHomeScreen}
                options={{
                    title: "Menu Dueño",
                    // headerLeft: () => (
                    //     <MaterialCommunityIcons
                    //         name="card-account-details"
                    //         size={25}
                    //         style={{marginLeft: 20}}
                    //         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                    //     />
                    // ),
                }}

            />

            {/*Pantalla del User*/}
            <Stack.Screen
                name="UserHomeScreen"
                component={UserHomeScreen}
                options={{
                    title: "Menu User",
                }}
            />
            {/*Pantalla Pets*/}
            <Stack.Screen
                name="PetScreen"
                component={PetScreen}
                options={{headerShown: false}}
            />

            {/*Pantalla detalles de la mascota*/}
            <Stack.Screen name="PetDetailsScreen" component={PetDetailsScreen}
                          options={{title: "Detalles de mascota"}}/>


            {/*Pantalla Listado de Citas de Mascota*/}
            <Stack.Screen name="AppointmentPetListScreen" component={AppointmentPetListScreen}
                          options={{title: "Listado de Citas"}}/>

            {/*Pantalla Listado de Cirguias de Mascota*/}
            <Stack.Screen name="SurgeryPetListScreen" component={SurgeryPetListScreen}
                          options={{title: "Listado de Cirugias"}}/>

            {/*Pantalla Listado de VACUNAS de Mascota*/}
            <Stack.Screen name="VaccinePetListScreen" component={VaccinePetListScreen}
                          options={{title: "Listado de Vacunas"}}/>


            {/*Accesos por rol*/}
            <Stack.Screen name="SuperAdminScreen" component={SuperAdminScreen}
                          options={{title: "SuperAdminScreen"}}/>

            <Stack.Screen name="VeterinarioScreen" component={VeterinarioScreen}
                          options={{title: "VeterinarioScreen"}}/>

            <Stack.Screen name="AsistenteScreen" component={AsistenteScreen}
                          options={{title: "AsistenteScreen"}}/>

            <Stack.Screen name="RecepcionScreen" component={RecepcionScreen}
                          options={{title: "RecepcionScreen"}}/>


        </Stack.Navigator>
    );
};
