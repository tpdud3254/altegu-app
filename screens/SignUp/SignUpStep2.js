import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignUpStep2() {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("SignUpStep3");
    };
    return (
        <View>
            <Text onPress={onPress}>SignUpStep2</Text>
        </View>
    );
}

SignUpStep2.propTypes = {};
export default SignUpStep2;
