import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyRootStackScreens } from "./ScreenNavigations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    DrawerActions,
    NavigationProp,
    useNavigation,
} from "@react-navigation/native";
import {HomeScreen,LoginScreen} from "../screens/";

const Stack = createStackNavigator<MyRootStackScreens>();
export const MyStackNavigator = () => {
    const navigation = useNavigation<NavigationProp<MyRootStackScreens>>();
    return (
        <Stack.Navigator initialRouteName="HomeScreen" id={undefined} >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "Menu",
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="card-account-details"
                            size={25}
                            style={{ marginLeft: 20 }}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
