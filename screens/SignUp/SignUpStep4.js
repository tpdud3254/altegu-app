import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignUpStep4() {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("SignUpStep5");
    };
    return (
        <View>
            <Text onPress={onPress}>SignUpStep4</Text>
        </View>
    );
}

SignUpStep4.propTypes = {};
export default SignUpStep4;
