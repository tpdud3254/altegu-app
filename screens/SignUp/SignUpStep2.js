import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import { ORDINARY } from "../../constant";
import Button from "../../component/presenter/button/Button";
import Title from "../../component/presenter/text/Title";
import { TextInput } from "../../component/presenter/input/TextInput";
import { useForm } from "react-hook-form";

function SignUpStep2({ route }) {
    const { register, handleSubmit, setValue, getValues, watch } = useForm(); //TODO:test code
    const navigation = useNavigation();

    const genderRef = useRef();
    const birthRef = useRef();
    const phoneRef = useRef(); //TODO:test code

    useEffect(() => {
        //TODO:test code
        register("userName");
        register("gender");
        register("birth");
        register("phone");

        setValue("userName", "고세영");
        setValue("gender", "여");
        setValue("birth", "950124");
        setValue("phone", "01090665452");
    }, [register]);

    console.log("member type : ", route?.params);

    //TODO:기능 추가 및 UI 구현
    const onNextStep = (data) => {
        console.log(data);
        const obj = {
            memberType: route?.params?.memberType,
            data,
        };

        console.log(obj);
        if (route?.params?.memberType === ORDINARY) {
            navigation.navigate("SignUpStep4", obj);
        } else {
            navigation.navigate("SignUpStep3", obj);
        }
    };

    const onValid = (data) => {
        const newData = { ...route?.params?.data, ...data }; //TODO: test code
        onNextStep(newData);
    };

    return (
        <FormLayout
            submitBtnProps={{ value: "다음으로", fn: handleSubmit(onValid) }}
        >
            <Title value="휴대폰 인증 받기" color="#555555" />
            <Button value="휴대폰 인증" fn={onNextStep} />
            <Text>------test code---------</Text>
            <TextInput
                placeholder="성명"
                returnKeyType="next"
                onSubmitEditing={() => onNext(genderRef)}
                onChangeText={(text) => setValue("userName", "고세영")}
            />
            <TextInput
                ref={genderRef}
                placeholder="성별"
                returnKeyType="next"
                onSubmitEditing={() => onNext(birthRef)}
                onChangeText={(text) => setValue("gender", "여")}
            />
            <TextInput
                ref={birthRef}
                placeholder="생년월일"
                returnKeyType="next"
                onSubmitEditing={() => onNext(phoneRef)}
                onChangeText={(text) => setValue("birth", "950124")}
            />
            <TextInput
                ref={phoneRef}
                placeholder="휴대폰번호"
                returnKeyType="next"
                // onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("phone", "01090665452")}
            />
        </FormLayout>
    );
}

SignUpStep2.propTypes = {};
export default SignUpStep2;
