import React, { useState } from "react";
import api, { setAuthToken } from "../config/api/api";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      const { token, owner } = response.data;
      await saveToken("authToken", token);
      setAuthToken(token);
      Alert.alert("Success", `Welcome, ${owner.names}`);
      navigation.navigate("Home");
      console.log('Token:', response.data.access_token);
    } catch (error) {
      Alert.alert("Error: ", error.message);
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const saveToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getToken = async (key) => {
    return await SecureStore.getItemAsync(key);
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
