import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignUpStep3() {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("SignUpStep4");
    };
    return (
        <View>
            <Text onPress={onPress}>SignUpStep3</Text>
        </View>
    );
}

SignUpStep3.propTypes = {};
export default SignUpStep3;
