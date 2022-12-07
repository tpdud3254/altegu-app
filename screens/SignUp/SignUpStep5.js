import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignUpStep5() {
    const navigation = useNavigation();

    const onPress = () => {
        console.log("done");
    };
    return (
        <View>
            <Text onPress={onPress}>SignUpStep5</Text>
        </View>
    );
}

SignUpStep5.propTypes = {};
export default SignUpStep5;
