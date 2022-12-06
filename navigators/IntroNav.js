import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

const Stack = createStackNavigator();

export default function IntroNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={nav.SignIn} component={SignIn} />
            <Stack.Screen name={nav.SignUp} component={SignUpNav} />
        </Stack.Navigator>
    );
}
