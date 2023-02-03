import React, { useContext, useEffect, useRef, useState } from "react";
import FormLayout from "../component/presenter/layout/FormLayout";
import styled from "styled-components/native";
import { TextInput } from "../component/presenter/input/TextInput";
import InputItem from "../component/presenter/item/InputItem";
import InputBtnItem from "../component/presenter/item/InputBtnItem";
import { Input } from "../component/presenter/input/Input";
import Title from "../component/presenter/title/Title";
import SubTitle from "../component/presenter/title/SubTitle";
import { theme } from "../styles";
import Button from "../component/presenter/button/Button";
import { useForm } from "react-hook-form";
import SubmitButton from "../component/presenter/button/SubmitButton";
import axios from "axios";
import { SERVER } from "../server";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import IsLoggedInContext from "../Context/IsLoggedInContext";
import UserContext from "../Context/UserContext";

const TitleContainter = styled.View`
    margin-bottom: 30px;
`;

const Container = styled.View``;
const InputContainer = styled.View`
    margin-bottom: 5px;
`;

function SignIn() {
    const [textSecure, setTextSecure] = useState(true);
    const { register, handleSubmit, setValue, watch } = useForm();
    const navigation = useNavigation();
    const { setIsLoggedIn } = useContext(IsLoggedInContext);
    const { info, setInfo } = useContext(UserContext);

    const passwordRef = useRef();

    useEffect(() => {
        register("phone", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register]);

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const ShowPassword = () => {
        setTextSecure((prev) => !prev);
    };

    const ResetPassword = () => {
        navigation.navigate("SetPassword");
    };

    const onValid = ({ phone, password }) => {
        axios({
            url: SERVER + "/users/sign-in",
            method: "POST",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTP-8",
            },
            withCredentials: true,
            data: { phone, password },
        }).then(async ({ data }) => {
            const { result, token, msg, user } = data;
            if (result) {
                setInfo(user);
                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("userId", user.id + "");
                setIsLoggedIn(true);
            } else {
                Toast.show({
                    type: "error",
                    text1: msg,
                });
            }
        });
    };

    return (
        <FormLayout>
            <Container>
                <TitleContainter>
                    <Title value="로그인" />
                    <SubTitle value="안녕하세요. 환영합니다." />
                </TitleContainter>
                <InputContainer>
                    <InputItem title="휴대폰번호">
                        <TextInput
                            placeholder="숫자만 적어주세요"
                            keyboardType="number-pad"
                            returnKeyType="next"
                            onSubmitEditing={() => onNext(passwordRef)}
                            onChangeText={(text) => setValue("phone", text)}
                        />
                    </InputItem>
                    <InputBtnItem
                        title="비밀번호"
                        btnTitle="보기"
                        fn={ShowPassword}
                    >
                        <Input
                            ref={passwordRef}
                            placeholder="비밀번호"
                            secureTextEntry={textSecure}
                            returnKeyType="done"
                            onChangeText={(text) => setValue("password", text)}
                        />
                    </InputBtnItem>
                </InputContainer>
                <Button
                    value="비밀번호 초기화"
                    fn={ResetPassword}
                    height="60px"
                    color={theme.btnColor}
                />
            </Container>

            <SubmitButton
                value="로그인"
                onPress={handleSubmit(onValid)}
                disabled={!(watch("phone") && watch("password"))}
            />
        </FormLayout>
    );
}

export default SignIn;
