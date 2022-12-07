import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SignUp from "../screens/SignUp/SignUp";
import SignUpStep1 from "../screens/SignUp/SignUpStep1";
import SignUpStep2 from "../screens/SignUp/SignUpStep2";
import SignUpStep3 from "../screens/SignUp/SignUpStep3";
import SignUpStep4 from "../screens/SignUp/SignUpStep4";
import SignUpStep5 from "../screens/SignUp/SignUpStep5";

const Stack = createStackNavigator();

export default function SignUpNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ title: "회원가입", headerBackTitleVisible: false }}
        >
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerBackTitle: "처음으로 가기",
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen name="SignUpStep1" component={SignUpStep1} />
            <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
            <Stack.Screen name="SignUpStep3" component={SignUpStep3} />
            <Stack.Screen name="SignUpStep4" component={SignUpStep4} />
            <Stack.Screen name="SignUpStep5" component={SignUpStep5} />
        </Stack.Navigator>
    );
}