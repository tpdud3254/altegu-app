import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Button, Text, View } from "react-native";
import DefaultLayout from "../component/presenter/layout/DefaultLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IsLoggedInContext from "../Context/IsLoggedInContext";
import UserContext from "../Context/UserContext";

function Home() {
    const { setIsLoggedIn } = useContext(IsLoggedInContext);
    const { info, setInfo } = useContext(UserContext);

    console.log("user info : ", info);
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
