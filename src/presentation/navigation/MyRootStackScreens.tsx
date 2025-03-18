export type MyRootStackScreens = {
    LoginScreen: undefined;
    HomeScreen: undefined;
    OwnerHomeScreen: undefined;
    UserHomeScreen: undefined;
    PetScreen: undefined;
    PetDetailsScreen: { idPet: number };
    AppointmentPetListScreen: { idPet: number };
    SurgeryPetListScreen: { idPet: number };
    VaccinePetListScreen: { idPet: number };

    // Accesos por role
    SuperAdminScreen: undefined;
    VeterinarioScreen: undefined;
    AsistenteScreen: undefined;
    RecepcionScreen: undefined;

}