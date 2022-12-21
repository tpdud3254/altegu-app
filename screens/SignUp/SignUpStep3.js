import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";

function SignUpStep3({ route }) {
    const navigation = useNavigation();

    console.log("member type : ", route?.params?.memberType);

    const onNextStep = () => {
        navigation.navigate("SignUpStep4", {
            memberType: route?.params?.memberType,
        });
    };
    return (
        <SubmitLayout submitBtnProps={{ value: "다음으로", fn: onNextStep }}>
            <Text>작업지역 선택</Text>
        </SubmitLayout>
    );
}

SignUpStep3.propTypes = {};
export default SignUpStep3;
