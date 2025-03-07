import React, { useState } from "react";
import { apiZooloMascotas,setAuthToken } from "../../../config/api/apiZooloMascotas";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    console.log('Intentando login con:', email, password);
    // Aquí irá la lógica de login más adelante
  };

  return (
    <View>     
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}        
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
