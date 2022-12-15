import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import { ORDINARY } from "../../constant";

function SignUpStep2({ route }) {
    const navigation = useNavigation();

    const onNextStep = () => {
        if (route?.params?.memberType === ORDINARY) {
            navigation.navigate("SignUpStep4", {
                memberType: route?.params?.memberType,
            });
        } else {
            navigation.navigate("SignUpStep3", {
                memberType: route?.params?.memberType,
            });
        }
    };

    return (
        <FormLayout submitBtnProps={{ value: "다음으로", fn: onNextStep }}>
            <Text>휴대폰 인증</Text>
        </FormLayout>
    );
}

SignUpStep2.propTypes = {};
export default SignUpStep2;
