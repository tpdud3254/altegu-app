import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import Title from "../../component/presenter/title/Title";
import InputItem from "../../component/presenter/item/InputItem";
import { TextInput } from "../../component/presenter/input/TextInput";
import InputBtnItem from "../../component/presenter/item/InputBtnItem";
import { Input } from "../../component/presenter/input/Input";
import Item from "../../component/presenter/item/Item";
import Button from "../../component/presenter/button/Button";
import { ORDINARY, SPECIAL } from "../../constant";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import axios from "axios";
import OrdinarySignUp from "./OrdinarySignUp";

function SignUpStep1({ route }) {
    const { register, handleSubmit, setValue, getValues, watch } = useForm();
    const [textSecure, setTextSecure] = useState(true);
    const navigation = useNavigation();

    const passwordRef = useRef();

    useEffect(() => {
        register("name", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register]);

    const onNextStep = (data) => {
        navigation.navigate("SignUpStep2", {
            memberType: route?.params?.memberType, //TODO: Redux 적용
            data: {
                userType: route?.params?.memberType,
                license,
                ...data,
            },
        });
    };

    const onValid = (data) => {
        if (data.name.length < 2) {
            Toast.show({
                type: "error",
                text1: "이름을 2자리 이상 입력해주세요.",
            });
            return;
        }
        if (data.password.length < 8) {
            Toast.show({
                type: "error",
                text1: "비밀번호를 8자리 이상 입력해주세요.",
            });

            return;
        }
        onNextStep(data);
    };

    const showPassword = () => {
        setTextSecure((prev) => !prev);
    };

    return (
        <FormLayout
            submitBtnProps={{
                value: "다음으로",
                fn: handleSubmit(onValid),
                disabled: !(watch("name") && watch("password")),
            }}
        >
            <Title value="회원가입" color="#555555" />
            <ScrollView style={{ marginBottom: 0 }}>
                <TouchableWithoutFeedback>
                    <View>
                        <InputItem title="이름">
                            <TextInput
                                placeholder="이름 (2자리 이상)"
                                returnKeyType="next"
                                onSubmitEditing={() => onNext(passwordRef)}
                                onChangeText={(text) => setValue("name", text)}
                            />
                        </InputItem>
                        <InputBtnItem
                            title="비밀번호 등록"
                            btnTitle="보기"
                            fn={showPassword}
                        >
                            <Input
                                ref={passwordRef}
                                placeholder="비밀번호 (8자리 이상)"
                                secureTextEntry={textSecure}
                                returnKeyType="done"
                                onChangeText={(text) =>
                                    setValue("password", text)
                                }
                            />
                        </InputBtnItem>
                        <Text>* 영문, 숫자를 포함한 8자 이상의 문자열</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </FormLayout>
    );
}

SignUpStep1.propTypes = {
    file: PropTypes.string,
};
export default SignUpStep1;
