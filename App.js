import { View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./styles";
import IntroNavigator from "./navigation/IntroNavigator";
import "react-native-gesture-handler";
import MainNavigator from "./navigation/MainNavigator";
import Toast from "react-native-toast-message";
import { toastConfig } from "./component/presenter/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecoilRoot } from "recoil";
import {
    IsLoggedInConsumer,
    IsLoggedInContext,
    IsLoggedInProvider,
} from "./Context/IsLoggedInContext";
import { UserProvider } from "./Context/UserContext";
import { SignUpProvider } from "./Context/SIgnUpContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { setIsLoggedIn } = useContext(IsLoggedInContext);

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
                    setIsLoggedIn(true);
                }
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
            <IsLoggedInProvider>
                <UserProvider>
                    <ThemeProvider theme={theme}>
                        <RecoilRoot>
                            <NavigationContainer>
                                <IsLoggedInConsumer>
                                    {({ isLoggedIn }) =>
                                        isLoggedIn ? (
                                            <MainNavigator />
                                        ) : (
                                            <SignUpProvider>
                                                <IntroNavigator />
                                            </SignUpProvider>
                                        )
                                    }
                                </IsLoggedInConsumer>
                            </NavigationContainer>
                            <Toast
                                position="bottom"
                                bottomOffset="90"
                                config={toastConfig}
                            />
                        </RecoilRoot>
                    </ThemeProvider>
                </UserProvider>
            </IsLoggedInProvider>
        </View>
    );
}
