import {StyleSheet, View, SafeAreaView} from "react-native";
import {getOwnerPets, useUserLoginStore} from "../../../actions";
import React, {useEffect, useState} from "react";
import {PetList} from "../../components/pet/PetList";
import {MyActivityIndicator} from "../../components";
import {Button, Layout, Text, Divider, useTheme} from "@ui-kitten/components";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";

export const PetScreen = () => {
    const navigation = useNavigation<StackNavigationProp<MyRootStackScreens>>();
    const {user} = useUserLoginStore();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchPets = async () => {
            if (!user) return;
            const petList = await getOwnerPets(user.id);
            setPets(petList || []);
            setLoading(false);
        }
        fetchPets();
    }, []);

    if (loading|| !user) {
        return (
            <Layout style={styles.loadingContainer}>
                <MyActivityIndicator/>
            </Layout>
        );
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text appearance='hint' category='s1'>
                            {pets.length > 0
                                ? `Hola ${user.names} tienes ${pets.length} mascota${pets.length > 1 ? 's' : ''} registrada${pets.length > 1 ? 's' : ''}`
                                : "No tienes mascotas registradas"}
                        </Text>
                    </View>

                    <Divider style={[styles.divider, {backgroundColor: theme['color-primary-500']}]}/>
                    <PetList pets={pets}/>

                    {pets.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text category='s1' appearance='hint' style={styles.emptyText}>
                                Aún no has registrado ninguna mascota
                            </Text>
                            <Button
                                style={styles.addButton}
                                status='primary'>
                                Agregar mi primera mascota
                            </Button>
                        </View>
                    )}
                </View>

                <View style={styles.footer}>
                    <Button
                        style={styles.chatButton}
                        onPress={() => navigation.navigate("ChatBotScreen")}
                        accessoryRight={(props) => (
                            <Text {...props} style={[props.style, styles.chatIcon]}>💬</Text>
                        )}
                        status='success'>
                        Conversa con ZooloMascotas IA
                    </Button>
                </View>
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    content: {
        flex: 1,
        paddingBottom: 80, // Espacio para el botón flotante
    },
    petList: {
        flex: 1, // Asegura que PetList ocupe todo el espacio disponible
    },
    header: {
        marginVertical: 16,
        alignItems: 'center'
    },
    title: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    divider: {
        marginVertical: 16,
        height: 2
    },
    emptyState: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        marginBottom: 16,
        textAlign: 'center'
    },
    addButton: {
        marginTop: 8,
        width: '80%'
    },
    footer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        alignItems: 'center'
    },
    chatButton: {
        width: '90%',
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chatIcon: {
        marginLeft: 8,
        fontSize: 18
    }
});