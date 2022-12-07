import React, { useState } from "react";
import FormLayout from "../component/presenter/layout/FormLayout";
import { TextInput } from "../component/presenter/input/TextInput";
import InputLayout from "../component/presenter/layout/InputLayout";
import InputBtnLayout from "../component/presenter/layout/InputBtnLayout";
import { Input } from "../component/presenter/input/Input";

function SignIn() {
    const [textSecure, setTextSecure] = useState(true);

    const onClick = () => {
        setTextSecure((prev) => !prev);
    };

    const onSubmit = () => {
        console.log("submit");
    };

    return (
        <FormLayout submitBtnProps={{ title: "로그인", fn: onSubmit }}>
            <InputLayout title="휴대폰 번호">
                <TextInput
                    placeholder="숫자만 적어주세요"
                    keyboardType="number-pad"
                    returnKeyType="next"
                />
            </InputLayout>
            <InputBtnLayout title="비밀번호" btnTitle="보기" fn={onClick}>
                <Input
                    placeholder="비밀번호"
                    secureTextEntry={textSecure}
                    returnKeyType="done"
                />
            </InputBtnLayout>
        </FormLayout>
    );
}

export default SignIn;
