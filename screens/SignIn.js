import React, { useState } from "react";
import FormLayout from "../component/presenter/layout/FormLayout";
import styled from "styled-components/native";
import { TextInput } from "../component/presenter/input/TextInput";
import InputItem from "../component/presenter/item/InputItem";
import InputBtnItem from "../component/presenter/item/InputBtnItem";
import { Input } from "../component/presenter/input/Input";
import Title from "../component/presenter/title/Title";
import SubTitle from "../component/presenter/title/SubTitle";
import { Text, View } from "react-native";
import { fonts, theme } from "../styles";
import Button from "../component/presenter/button/Button";

const TitleContainter = styled.View`
    margin-bottom: 30px;
`;

const InputContainer = styled.View`
    margin-bottom: 5px;
`;

function SignIn() {
    const [textSecure, setTextSecure] = useState(true);

    const ShowPassword = () => {
        setTextSecure((prev) => !prev);
    };

    const ResetPassword = () => {
        console.log("reset");
    };
    const onSubmit = () => {
        console.log("submit");
    };

    return (
        <FormLayout submitBtnProps={{ value: "로그인", fn: onSubmit }}>
            <TitleContainter>
                <Title value="로그인" color="#555555" />
                <SubTitle value="안녕하세요. 환영합니다." color="#777777" />
            </TitleContainter>
            <InputContainer>
                <InputItem title="휴대폰번호">
                    <TextInput
                        placeholder="숫자만 적어주세요"
                        keyboardType="number-pad"
                        returnKeyType="next"
                    />
                </InputItem>
                <InputBtnItem
                    title="비밀번호"
                    btnTitle="보기"
                    fn={ShowPassword}
                >
                    <Input
                        placeholder="비밀번호"
                        secureTextEntry={textSecure}
                        returnKeyType="done"
                    />
                </InputBtnItem>
            </InputContainer>

            <Button
                value="비밀번호 초기화"
                fn={ResetPassword}
                height="60px"
                color={theme.btnColor}
            />
        </FormLayout>
    );
}

export default SignIn;
