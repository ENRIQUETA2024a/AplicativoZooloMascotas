import {useState} from "react";
import {Alert, Image, ScrollView, StyleSheet, useWindowDimensions} from "react-native";
import {useLoginStore} from "../../../actions/owners/ownerLoginState";
import {Button, Icon, Input, Layout, Text} from "@ui-kitten/components";
import {MyIcon} from "../../components/ui/MyIcon";

export const LoginScreen = () => {
    const Logo = require("../../../assets/LogoZooloMascotas.png");
    const {login} = useLoginStore();
    const [passwordView, setPasswordView] = useState(false);

    const toggleSecureEntry = () => setPasswordView(prev => !prev);

    const [form, setForm] = useState({
        email: "Demo1@gmail.com",
        password: "123456",
    });

    const onLogin = async () => {
        if (!form.email.trim() || !form.password.trim()) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return;
        }

        const loginExitoso = await login(form.email, form.password);
        if (!loginExitoso) {
            Alert.alert("Error", "Usuario o contraseña incorrectos");
            return;
        }
    };

    const {height} = useWindowDimensions();


    return (
        <Layout style={{flex: 1}}>
            <ScrollView style={{paddingTop: height * 0.25, marginHorizontal: 40}}>
                <Layout style={styles.imageContainer}>
                    <Image source={Logo} style={styles.imgLogo}
                           onError={(e) => console.log("Error cargando la imagen:", e.nativeEvent.error)}/>
                </Layout>

                <Layout>
                    <Text category="h1">Ingresar</Text>
                    <Text category="p1">Porfavor, ingrese para continuar</Text>
                </Layout>

                <Layout style={{marginTop: 20}}>
                    <Input
                        placeholder="Correo Electronico"
                        style={{marginBottom: 10}}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      accessoryLeft={<MyIcon name="email-outline" style={{}}/>}
                        value={form.email || ""} //
                        onChangeText={(email) => setForm({...form, email})}
                    />

                    <Input
                        placeholder="Contraseña"
                        style={{marginBottom: 10}}
                        secureTextEntry={!passwordView}
                        accessoryLeft={<MyIcon name="lock-outline" style={{}}/>}
                        value={form.password || ""}//
                        onChangeText={(password) => setForm({...form, password})}

                         accessoryRight={<Icon name={passwordView ? 'eye-off' : 'eye'} style={{ width: 24, height: 24}}
                                               onPress={toggleSecureEntry}/>}

                    />
                </Layout>

                <Layout style={{height: 10}}/>
                <Button
                    onPress={onLogin}
                    accessoryRight={
                        <MyIcon
                            white
                            name="arrow-forward-outline"
                            style={{height: 32, width: 32}}
                        />
                    }
                >
                    Ingresar
                </Button>
                <Layout style={{height: 30}}/>

                <Layout
                    style={{
                        alignItems: "flex-end",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Text>¿No tienes una cuenta? </Text>
                    <Text
                        status="primary"
                        category="s1"
                        onPress={() => {
                            Alert.alert("¿Como tener una cuenta?", "Recuerda que debes tener almenos una atencion en nuestra veterinaria, luego se te dara tu usuario y contraseña.");
                        }}
                    >
                        Mas Informacion
                    </Text>
                </Layout>

            </ScrollView>
        </Layout>
    );
};


const styles = StyleSheet.create({
    imgLogo: {
        width: 300,
        height: 125,
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: 15,
    },
});
