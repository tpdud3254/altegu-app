import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, Text, View } from "react-native";
import TabIcon from "../component/presenter/icon/TabIcons";
import Home from "../screens/Home";
import RegistWork from "../screens/RegistWork/RegistWork";
import SelectWorkTheme from "../screens/RegistWork/SelectWorkTheme";
import Works from "../screens/Works";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopColor: "rgba(0,0,0,0.3)",
                    paddingTop: 15,
                },
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName="home"
                            size={22}
                            focused={focused}
                            iconText="홈"
                        />
                    ),
                }}
                component={Home}
            />
            <Tabs.Screen
                name="TabRegistWork"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName="add-circle"
                            size={24}
                            focused={focused}
                            iconText="작업 등록"
                        />
                    ),
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="SelectWorkTheme"
                            component={SelectWorkTheme}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="RegistWork"
                            component={RegistWork}
                            options={{
                                headerBackTitleVisible: false,
                                title: "작업 등록",
                            }}
                        />
                    </Stack.Navigator>
                )}
            </Tabs.Screen>
            <Tabs.Screen
                name="Works"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName="list"
                            size={24}
                            focused={focused}
                            iconText="내 작업보기"
                        />
                    ),
                }}
                component={Works}
            />
            {/* {() => <SharedStackNav screenName={nav.Feed} />} */}
            {/* </Tabs.Screen> */}
            {/* <Tabs.Screen
                name={nav.Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"search"}
                            size={22}
                            focused={focused}
                        />
                    ),
                }}
            >
                {() => <SharedStackNav screenName={nav.Search} />}
            </Tabs.Screen>
            <Tabs.Screen
                name={nav.Camera}
                component={View}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate("Upload");
                        },
                    };
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"camera"}
                            size={26}
                            focused={focused}
                        />
                    ),
                }}
            ></Tabs.Screen>
            <Tabs.Screen
                name={nav.Notifications}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName={"heart"}
                            size={22}
                            focused={focused}
                        />
                    ),
                }}
            >
                {() => <SharedStackNav screenName={nav.Notifications} />}
            </Tabs.Screen>
            <Tabs.Screen
                name={nav.Me}
                options={{
                    tabBarIcon: ({ focused, color, size }) =>
                        data?.me?.avatar ? (
                            <Image
                                source={{ uri: data.me.avatar }}
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: "50%",
                                    ...(focused && {
                                        borderColor: "white",
                                        borderWidth: 1,
                                    }),
                                }}
                            />
                        ) : (
                            <TabIcon
                                iconName={"person"}
                                size={22}
                                focused={focused}
                            />
                        ),
                }}
            >
                {() => <SharedStackNav screenName={nav.Me} />}
            </Tabs.Screen> */}
        </Tabs.Navigator>
    );
}
