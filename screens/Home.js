import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Button, Text, View } from "react-native";
import DefaultLayout from "../component/presenter/layout/DefaultLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IsLoggedInContext from "../context";

function Home() {
    const { setIsLoggedIn } = useContext(IsLoggedInContext);
    return (
        <DefaultLayout>
            <Text>Home</Text>
            <Button
                title="로그아웃"
                onPress={async () => {
                    await AsyncStorage.removeItem("token");
                    setIsLoggedIn(false);
                }}
            ></Button>
        </DefaultLayout>
    );
}

Home.propTypes = {};
export default Home;
