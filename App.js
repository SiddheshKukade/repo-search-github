import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/Home/Home";
import CardsList from "./src/components/Cards/CardsList";
import { LogBox } from "react-native";

export default function App() {
  return (
    <NavigationContainer initialRouteName="Search">
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Home} />
        <Stack.Screen name="Repositories" component={CardsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
