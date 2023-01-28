import React, { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import Title from "../../component/presenter/title/Title";
import InputItem from "../../component/presenter/item/InputItem";
import { TextInput } from "../../component/presenter/input/TextInput";
import InputBtnItem from "../../component/presenter/item/InputBtnItem";
import { Input } from "../../component/presenter/input/Input";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import ContentText from "../../component/presenter/text/ContentText";
import SubmitButton from "../../component/presenter/button/SubmitButton";
import SignUpContext from "../../Context/SIgnUpContext";
import { checkPassword } from "../../utils";
import { theme } from "../../styles";

function OrdinarySignUp() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [textSecure, setTextSecure] = useState(true);
    const navigation = useNavigation();
    const { info, setInfo } = useContext(SignUpContext);

    const passwordRef = useRef();

    useEffect(() => {
        register("name", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register]);

    const showPassword = () => {
        setTextSecure((prev) => !prev);
    };

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onNextStep = ({ name, password }) => {
        const newData = { name, password };
        setInfo({ ...newData, ...info });
        navigation.navigate("SignUpStep2");
    };

    const onValid = ({ name, password }) => {
        if (name.length < 2) {
            Toast.show({
                type: "error",
                text1: "이름을 2자리 이상 입력해주세요.",
            });
            return;
        }
        if (password.length < 8) {
            Toast.show({
                type: "error",
                text1: "비밀번호를 8자리 이상 입력해주세요.",
            });

            return;
        }

        if (!checkPassword(password)) {
            Toast.show({
                type: "error",
                text1: "비밀번호가 조건에 맞지 않습니다.",
            });

            return;
        }

        onNextStep({ name, password });
    };

    return (
        <FormLayout>
            <View>
                <Title value="회원가입" />
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
                        onChangeText={(text) => setValue("password", text)}
                    />
                </InputBtnItem>
                <ContentText
                    style={{
                        fontSize: 18,
                        marginTop: -10,
                        color: theme.darkFontColor,
                    }}
                >
                    * 영문, 숫자를 포함한 8자 이상의 문자열
                </ContentText>
            </View>
            <SubmitButton
                value="회원가입"
                onPress={handleSubmit(onValid)}
                disabled={!(watch("name") && watch("password"))}
            />
        </FormLayout>
    );
}

export default OrdinarySignUp;
