import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import { ORDINARY } from "../../constant";
import Button from "../../component/presenter/button/Button";
import Title from "../../component/presenter/title/Title";
import { TextInput } from "../../component/presenter/input/TextInput";
import { useForm } from "react-hook-form";
import SignUpContext from "../../Context/SIgnUpContext";
import SubmitButton from "../../component/presenter/button/SubmitButton";
import axios from "axios";
import { SERVER } from "../../server";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function SignUpStep2() {
    const { info, setInfo } = useContext(SignUpContext);

    console.log(info);
    const navigation = useNavigation();

    //TODO:기능 추가 및 UI 구현
    const onNextStep = (data) => {
        setInfo({ ...data, ...info });

        if (info.userType === ORDINARY) {
            navigation.navigate("SignUpStep4");
        } else {
            navigation.navigate("SignUpStep3");
        }
    };

    const onValid = () => {
        //TODO: Test code
        const testData = {
            userName: "박승아",
            gender: "남",
            birth: "991015",
            phone: "01011112222",
        };

        //TODO:존재하는 핸드폰 번호 인지 체크
        axios({
            url: SERVER + `/users/check?phone=${testData.phone}`,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTP-8",
            },
            withCredentials: true,
        })
            .then(async ({ data }) => {
                const { result } = data;

                if (!result) {
                    onNextStep(testData);
                } else {
                    Toast.show({
                        type: "error",
                        text1: "존재하는 사용자입니다.",
                    });
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .then(() => {});
    };

    const clickAuth = () => {};

    return (
        <FormLayout>
            <Title value="본인 인증" />
            <Button value="휴대폰 인증" fn={clickAuth} />
            <SubmitButton
                value="다음으로"
                onPress={onValid}
                // disabled={!(watch("name") && watch("password"))} TODO:인증완료 안되면 true
            />
        </FormLayout>
    );
}

SignUpStep2.propTypes = {};
export default SignUpStep2;
