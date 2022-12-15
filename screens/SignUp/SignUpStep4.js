import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";

function SignUpStep4({ route }) {
    const navigation = useNavigation();

    const onNextStep = () => {
        navigation.navigate("SignUpStep5", {
            memberType: route?.params?.memberType,
        });
    };
    return (
        <SubmitLayout submitBtnProps={{ value: "동의하기", fn: onNextStep }}>
            <Text>약관 동의</Text>
        </SubmitLayout>
    );
}

SignUpStep4.propTypes = {};
export default SignUpStep4;
