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
import UserContext, { UserProvider } from "./Context/UserContext";
import { SignUpProvider } from "./Context/SIgnUpContext";
import axios from "axios";
import { SERVER } from "./server";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
    const { setInfo } = useContext(UserContext);

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
                const userId = parseInt(await AsyncStorage.getItem("userId"));
                console.log("token : ", token);
                console.log("userId : ", userId);
                if (userId) {
                    axios({
                        url: SERVER + `/users/user?id=${userId}`,
                        method: "GET",
                        header: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTP-8",
                        },
                        withCredentials: true,
                    }).then(async ({ data }) => {
                        const { result, userInfo } = data;
                        console.log("userInfo : ", userInfo);
                        if (result) {
                            setInfo(userInfo);
                            if (token) {
                                setIsLoggedIn(true);
                            }
                        } else {
                            Toast.show({
                                type: "error",
                                text1: msg,
                            });
                        }
                    });
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

    const getToken = () => {
        return AsyncStorage.getItem("token");
    };

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <IsLoggedInProvider>
                <UserProvider>
                    <ThemeProvider theme={theme}>
                        <NavigationContainer>
                            <IsLoggedInConsumer>
                                {({ isLoggedIn }) =>
                                    isLoggedIn ? ( //TODO로그인 이슈
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
                    </ThemeProvider>
                </UserProvider>
            </IsLoggedInProvider>
        </View>
    );
}
