import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Intro from "../screens/Intro";
import SignIn from "../screens/SignIn";
import SignUpNavigator from "./SignUpNavigator";

const Stack = createStackNavigator();

export default function IntroNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Intro"
                component={Intro}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: "로그인", headerBackTitle: "처음으로 가기" }}
            />
            <Stack.Screen
                name="SignUpNavigator"
                component={SignUpNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}