import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import DefaultLayout from "../component/presenter/layout/DefaultLayout";
import Button from "../component/presenter/button/Button";
import { theme } from "../styles";
import Title from "../component/presenter/title/Title";
import ContentText from "../component/presenter/text/ContentText";
import InputItem from "../component/presenter/item/InputItem";
import { TextInput } from "../component/presenter/input/TextInput";
import { View } from "react-native";
import SubmitButton from "../component/presenter/button/SubmitButton";
import { useForm } from "react-hook-form";
import { SERVER } from "../server";
import { checkPassword } from "../utils";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
`;

const PasswordContainer = styled.View`
    flex: 1;
    justify-content: space-between;
`;

function SetPassword() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [pass, setPass] = useState(false);
    const [phone, setPhone] = useState("010390665452"); //TODO: test code
    const passwordRef = useRef();
    const navigation = useNavigation();

    useEffect(() => {
        register("newPassword", {
            required: true,
        });
        register("newPasswordCheck", {
            required: true,
        });
    }, [register]);

    const ClickAuthButton = () => {
        setPass(true); //TODO: test code
    };

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = ({ newPassword, newPasswordCheck }) => {
        if (newPassword === newPasswordCheck) {
            if (checkPassword(newPassword)) {
                axios({
                    url: SERVER + "/users/password",
                    method: "POST",
                    header: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTP-8",
                    },
                    withCredentials: true,
                    data: { phone, password: newPassword },
                }).then(async ({ data }) => {
                    const { result, msg } = data;
                    if (result) {
                        Toast.show({
                            type: "error",
                            text1: "비밀번호가 변경 되었습니다.",
                        });
                        navigation.navigate("SignIn", {
                            reset: true,
                        });
                    } else {
                        Toast.show({
                            type: "error",
                            text1: msg,
                        });
                    }
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "비밀번호가 조건에 맞지 않습니다.",
                });
            }
        } else {
            Toast.show({
                type: "error",
                text1: "비밀번호가 일치하지 않습니다.",
            });
        }
        //password check
    };

    return (
        <DefaultLayout>
            <Title value="비밀번호 재설정" color="#555555" />
            {pass ? (
                <PasswordContainer>
                    <View>
                        <InputItem title="새 비밀번호">
                            <TextInput
                                returnKeyType="next"
                                onSubmitEditing={() => onNext(passwordRef)}
                                secureTextEntry={true}
                                onChangeText={(text) =>
                                    setValue("newPassword", text)
                                }
                            />
                        </InputItem>
                        <InputItem title="새 비밀번호 확인">
                            <TextInput
                                ref={passwordRef}
                                returnKeyType="done"
                                secureTextEntry={true}
                                onChangeText={(text) =>
                                    setValue("newPasswordCheck", text)
                                }
                            />
                        </InputItem>
                        <ContentText style={{ fontSize: 20 }}>
                            * 영문, 숫자를 포함한 8자 이상의 문자열
                        </ContentText>
                    </View>

                    <SubmitButton
                        value="비밀번호 재설정"
                        onPress={handleSubmit(onValid)}
                        disabled={
                            !(watch("newPassword") && watch("newPasswordCheck"))
                        }
                    />
                </PasswordContainer>
            ) : (
                <Container>
                    <Button
                        value="본인 인증하기"
                        fn={ClickAuthButton}
                        height="60px"
                        color={theme.btnColor}
                    />
                    <ContentText style={{ fontSize: 19 }}>
                        본인 인증 후 비밀번호 초기화가 가능합니다.
                    </ContentText>
                </Container>
            )}
        </DefaultLayout>
    );
}

SetPassword.propTypes = {};
export default SetPassword;
