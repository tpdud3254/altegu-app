import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignUp() {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("SignUpStep2");
    };
    return (
        <View>
            <Text onPress={onPress}>signup</Text>
        </View>
    );
}

SignUp.propTypes = {};
export default SignUp;
