import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignUpStep1() {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("SignUpStep2");
    };
    return (
        <View>
            <Text onPress={onPress}>SignUpStep1</Text>
        </View>
    );
}

SignUpStep1.propTypes = {};
export default SignUpStep1;
