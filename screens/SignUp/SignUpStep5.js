import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";

function SignUpStep5() {
    const navigation = useNavigation();

    console.log("member type : ", route?.params?.memberType);

    const onNextStep = () => {
        console.log("done");
    };
    return (
        <SubmitLayout submitBtnProps={{ value: "시작하기", fn: onNextStep }}>
            <Text>환영합니다</Text>
        </SubmitLayout>
    );
}

SignUpStep5.propTypes = {};
export default SignUpStep5;
