import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import TabsNavigator from "./TabsNavigator";

const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="TabsNavigator" component={TabsNavigator} />
        </Stack.Navigator>
    );
}
