import * as React from "react";
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {StyleSheet, View} from "react-native";
import {Button, Icon, Layout, Text} from "@ui-kitten/components";
import {MyStackNavigator} from "./MyStackNavigator";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useUserLoginStore} from "../../actions";
import {MyRootStackScreens} from "./MyRootStackScreens";
import {StackNavigationProp} from "@react-navigation/stack";

const Drawer = createDrawerNavigator();

export default function MyDrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerType: "slide",
                headerShown: false,
                drawerActiveBackgroundColor: "#4CAF50", // Verde para el ítem activo
                drawerActiveTintColor: "#FFF",
                drawerInactiveBackgroundColor: "#FFF",
                drawerInactiveTintColor: "#2E3A59",
                drawerItemStyle: {
                    borderRadius: 15,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                },
                swipeEnabled: true, // Habilitado para mejor UX en móviles
                drawerStyle: {
                    backgroundColor: "#F9FAFB", // Fondo claro para el drawer
                    width: 280, // Ancho más cómodo
                },
            }}
        >
            <Drawer.Screen
                name="MyStackNavigator"
                component={MyStackNavigator}
                options={{
                    drawerLabel: "Inicio",
                    drawerIcon: ({color}) => (
                        <Icon name="home-outline" style={styles.drawerIcon} fill={color}/>
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const {logout, user, userType, role} = useUserLoginStore();
    const navigation = useNavigation<StackNavigationProp<MyRootStackScreens>>();
    const {top} = useSafeAreaInsets();

    return (
        <DrawerContentScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentContainer}
        >
            {/* Encabezado */}
            <Layout style={[styles.header, {paddingTop: top + 15}]}>
                <View style={styles.avatarContainer}>
                    <Icon name="person" style={styles.avatarIcon} fill="#FFF"/>
                </View>
                <Text category="h6" style={styles.userName}>
                    {user ? `${user.names} ${user.surnames}` : "Usuario"}
                </Text>
                <Text category="s1" appearance="hint" style={styles.userEmail}>
                    {user?.email || "No disponible"}
                </Text>
            </Layout>

            {/* Opciones de navegación */}
            <Layout style={styles.navSection}>
                {props.state.routes.map((route, index) => (
                    <Button
                        key={route.key}
                        style={[
                            styles.navItem,
                            props.state.index === index && styles.navItemActive,
                        ]}
                        appearance="filled"
                        accessoryLeft={
                            <Icon
                                name="home-outline"
                                style={styles.navIcon}
                                fill={props.state.index === index ? "#FFF" : "#8F9BB3"}
                            />
                        }
                        status={"info"}
                        onPress={() => props.navigation.navigate(route.name)}
                    >
                        {/*{props.descriptors[route.key].options.drawerLabel || route.name}*/}
                        Inicio
                    </Button>
                ))}


                {userType === "user" && role === "Super-Admin" && (
                    <Button
                        style={[
                            styles.navItem,
                            styles.navItemActive,
                        ]}
                        appearance="filled"
                        accessoryLeft={
                            <Icon
                                name="settings-outline"
                                style={styles.navIcon}
                            />
                        }
                        status={"warning"}
                        onPress={() => navigation.navigate("UserAdminScreen")}
                    >
                        Usuarios
                    </Button>
                )}

            </Layout>

            {/* Sección de datos */}
            <Layout style={styles.dataSection}>
                <DataItem
                    label="Tipo de Documento"
                    value={user?.type_document || "No especificado"}
                    icon="file-text-outline"
                />
                <DataItem
                    label="N° Documento"
                    value={user?.n_document || "No especificado"}
                    icon="hash-outline"
                />
                <DataItem
                    label="Dirección"
                    value={user?.address || "No especificada"}
                    icon="map-outline"
                />
                <DataItem
                    label="Teléfono"
                    value={user?.phone || "No especificado"}
                    icon="phone-outline"
                />
                <DataItem
                    label="Contacto de Emergencia"
                    value={user?.emergency_contact || "No especificado"}
                    icon="alert-circle-outline"
                />
            </Layout>

            {/* Footer con botón de cerrar sesión */}
            <Layout style={styles.footer}>
                <Button
                    style={styles.logoutButton}
                    status="danger"
                    appearance="filled"
                    accessoryLeft={<Icon name="log-out-outline" style={styles.buttonIcon}/>}
                    onPress={() => {
                        logout();
                        navigation.dispatch(DrawerActions.closeDrawer());
                    }}
                >
                    Cerrar Sesión
                </Button>
            </Layout>
        </DrawerContentScrollView>
    );
};

// Componente reutilizable para mostrar datos
const DataItem = ({label, value, icon}: { label: string; value: string; icon: string }) => (
    <View style={styles.dataItem}>
        <Icon name={icon} style={styles.dataIcon} fill="#8F9BB3"/>
        <View style={styles.dataTextContainer}>
            <Text category="label" appearance="hint" style={styles.dataLabel}>
                {label}
            </Text>
            <Text style={styles.dataValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: "#F9FAFB",
    },
    contentContainer: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: "#4CAF50",
        padding: 20,
        alignItems: "center",
        borderRadius: 20

        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#388E3C",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    avatarIcon: {
        width: 50,
        height: 50,
    },
    userName: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 5,
    },
    userEmail: {
        color: "#E8F5E9",
        fontSize: 14,
    },
    navSection: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    navItem: {
        borderRadius: 15,
        marginVertical: 5,
        paddingVertical: 10,
        justifyContent: "flex-start",
    },
    navItemActive: {
//         backgroundColor: "#4CAF50",
    },
    navIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    dataSection: {
        padding: 15,
        backgroundColor: "#FFF",
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dataItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E8ECEF",
    },
    dataIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    dataTextContainer: {
        flex: 1,
    },
    dataLabel: {
        fontSize: 12,
        color: "#8F9BB3",
    },
    dataValue: {
        fontSize: 16,
        color: "#2E3A59",
        fontWeight: "500",
    },
    footer: {
        padding: 15,
        marginTop: "auto",
    },
    logoutButton: {
        borderRadius: 15,
        paddingVertical: 10,
    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    drawerIcon: {
        width: 24,
        height: 24,
    },
});