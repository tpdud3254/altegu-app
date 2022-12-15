import React, { useState } from "react";
import FormLayout from "../component/presenter/layout/FormLayout";
import { TextInput } from "../component/presenter/input/TextInput";
import InputItem from "../component/presenter/layout/InputItem";
import InputBtnItem from "../component/presenter/layout/InputBtnItem";
import { Input } from "../component/presenter/input/Input";
import Title from "../component/presenter/text/Title";

function SignIn() {
    const [textSecure, setTextSecure] = useState(true);

    const onClick = () => {
        setTextSecure((prev) => !prev);
    };

    const onSubmit = () => {
        console.log("submit");
    };

    return (
        <FormLayout submitBtnProps={{ value: "로그인", fn: onSubmit }}>
            <Title value="로그인" color="#555555" />
            <InputItem title="휴대폰 번호">
                <TextInput
                    placeholder="숫자만 적어주세요"
                    keyboardType="number-pad"
                    returnKeyType="next"
                />
            </InputItem>
            <InputBtnItem title="비밀번호" btnTitle="보기" fn={onClick}>
                <Input
                    placeholder="비밀번호"
                    secureTextEntry={textSecure}
                    returnKeyType="done"
                />
            </InputBtnItem>
        </FormLayout>
    );
}

export default SignIn;
