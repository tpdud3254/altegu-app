import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import { ORDINARY } from "../../constant";
import Button from "../../component/presenter/button/Button";
import Title from "../../component/presenter/text/Title";

function SignUpStep2({ route }) {
    const navigation = useNavigation();

    console.log("member type : ", route?.params?.memberType);

    //TODO:기능 추가 및 UI 구현
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
            <Title value="휴대폰 인증 받기" color="#555555" />
            <Button value="휴대폰 인증" fn={onNextStep} />
        </FormLayout>
    );
}

SignUpStep2.propTypes = {};
export default SignUpStep2;
