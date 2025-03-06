import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { HomeScreen } from "./presentation/HomeScreen";
import { LoginScreen } from "./presentation/LoginScreen";

type RootStackParams = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const VeterinariaApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return null; // Muestra una pantalla de carga mientras verifica el token
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator id={undefined}>
        

          {isAuthenticated ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Inicio" }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Iniciar Sesión" }}
            />
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
