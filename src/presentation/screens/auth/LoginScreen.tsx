import React, { useState} from "react";
import {Alert, Image, ScrollView, StyleSheet} from "react-native";
import {Button, Icon, Input, Layout, Text} from "@ui-kitten/components";
import {useUserLoginStore} from "../../../actions";
import {MyActivityIndicator, MyIcon} from "../../components";


export const LoginScreen = () => {
    const Logo = require("../../../assets/LogoZooloMascotas.png");
    const {login} = useUserLoginStore();
    const [passwordView, setPasswordView] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleSecureEntry = () => setPasswordView((prev) => !prev);

    const [form, setForm] = useState({
        //email: "Demo1@gmail.com",
        email: "i2220967@continental.edu.pe",
        password: "12345678",
    });

    const onLogin = async () => {
        if (!form.email.trim() || !form.password.trim()) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return;
        }

        setIsSubmitting(true);
        const loginExitoso = await login(form.email, form.password);
        setIsSubmitting(false);

        if (!loginExitoso) {
            Alert.alert("Error", "Usuario o contraseña incorrectos");
        }
    };

    return (
        <Layout style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Encabezado con logo */}
                <Layout style={styles.header}>
                    <Image
                        source={Logo}
                        style={styles.imgLogo}
                        resizeMode="contain"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => console.log("Error cargando la imagen:", e.nativeEvent.error)}
                    />
                    {!imageLoaded && <MyActivityIndicator style={styles.logoLoader}/>}
                    <Text category="h4" style={styles.title}>
                        Bienvenido
                    </Text>
                    <Text category="s1" appearance="hint" style={styles.subtitle}>
                        Inicia sesión para continuar
                    </Text>
                </Layout>

                {/* Formulario */}
                <Layout style={styles.formContainer}>
                    <Input
                        placeholder="Correo Electrónico"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        accessoryLeft={<MyIcon name="email-outline"/>}
                        value={form.email}
                        onChangeText={(email) => setForm({...form, email})}
                        disabled={isSubmitting}
                    />
                    <Input
                        placeholder="Contraseña"
                        style={styles.input}
                        secureTextEntry={!passwordView}
                        accessoryLeft={<MyIcon name="lock-outline"/>}
                        accessoryRight={
                            <Icon
                                name={passwordView ? "eye-off" : "eye"}
                                style={styles.eyeIcon}
                                onPress={toggleSecureEntry}
                            />
                        }
                        value={form.password}
                        onChangeText={(password) => setForm({...form, password})}
                        disabled={isSubmitting}
                    />
                    <Button
                        style={styles.loginButton}
                        onPress={onLogin}
                        disabled={isSubmitting}
                        status={"info"}
                        accessoryRight={
                            isSubmitting ? (
                                <MyActivityIndicator/>
                            ) : (
                                <MyIcon name="arrow-forward-outline" white style={styles.buttonIcon}/>
                            )
                        }
                    >
                        {isSubmitting ? "Iniciando..." : "Ingresar"}
                    </Button>
                </Layout>

                {/* Pie de página */}
                <Layout style={styles.footer}>
                    <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
                    <Text
                        status="primary"
                        category="s1"
                        style={styles.link}
                        onPress={() =>
                            Alert.alert(
                                "¿Cómo tener una cuenta?",
                                "Recuerda que debes tener al menos una atención en nuestra veterinaria, luego se te informara tu usuario y contraseña."
                            )
                        }
                    >
                        Más Información
                    </Text>
                </Layout>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB", // Fondo gris claro para un look moderno
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    imgLogo: {
        width: 250,
        height: 100,
        marginBottom: 20,
    },
    logoLoader: {
        position: "absolute",
        top: "50%",
        transform: [{translateY: -20}],
    },
    title: {
        color: "#1A2138",
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitle: {
        color: "#8F9BB3",
        fontSize: 16,
    },
    formContainer: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
    },
    eyeIcon: {
        width: 24,
        height: 24,
        tintColor: "#8F9BB3",
    },
    loginButton: {
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 12,
    },
    buttonIcon: {
        width: 24,
        height: 24,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },
    footerText: {
        color: "#2E3A59",
        fontSize: 14,
    },
    link: {
        fontWeight: "600",
    },
});