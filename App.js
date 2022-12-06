import { Image, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Intro from "./screens/Intro";
import { Asset } from "expo-asset";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./styles";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const isLoggedIn = false; //TODO: 전역 변수로 바꾸기
    useEffect(() => {
        async function prepare() {
            try {
                //TODO: token preload
                //TODO: font preload
                //TODO: image preload
                // await Font.loadAsync(Entypo.font);
                // await new Promise.all([...imagePromises]);
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    {isLoggedIn ? <Text>logged in</Text> : <Intro />}
                </NavigationContainer>
            </ThemeProvider>
        </View>
    );
}
