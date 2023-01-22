import { Image, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Intro from "./screens/Intro";
import { Asset } from "expo-asset";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./styles";
import IntroNavigator from "./navigation/IntroNavigator";
import "react-native-gesture-handler";
import MainNavigator from "./navigation/MainNavigator";
import Toast from "react-native-toast-message";
import { toastConfig } from "./component/presenter/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    let isLoggedIn = false; //TODO: 전역 변수로 바꾸기

    const [fontsLoaded] = useFonts({
        MICEGothic: require("./assets/fonts/MICEGothic.ttf"),
        Korail_Round_Gothic_Bold: require("./assets/fonts/Korail_Round_Gothic_Bold.ttf"),
        "NotoSansKR-Regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
        "NotoSansKR-Bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
    });

    useEffect(() => {
        async function prepare() {
            try {
                //TODO: token preload
                const token = await AsyncStorage.getItem("token");
                console.log("token : ", token);
                if (token) {
                    isLoggedIn = true;
                }

                console.log("fontsLoaded : ", fontsLoaded);
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
        if (appIsReady && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    {isLoggedIn ? <MainNavigator /> : <IntroNavigator />}
                </NavigationContainer>
                <Toast
                    position="bottom"
                    bottomOffset="90"
                    config={toastConfig}
                />
            </ThemeProvider>
        </View>
    );
}
