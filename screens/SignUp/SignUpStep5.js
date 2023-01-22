import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";
import Title from "../../component/presenter/title/Title";

function SignUpStep5({ route, navigation }) {
    console.log("member type : ", route?.params?.memberType);

    const onNextStep = () => {
        console.log("done");
        //TODOS:로그인 설정 (로그인 후 로그인 변수 true)
        // navigation.navigate("Home");
    };
    return (
        <SubmitLayout submitBtnProps={{ value: "시작하기", fn: onNextStep }}>
            <Title value="환영합니다" />
        </SubmitLayout>
    );
}

SignUpStep5.propTypes = {};
export default SignUpStep5;
