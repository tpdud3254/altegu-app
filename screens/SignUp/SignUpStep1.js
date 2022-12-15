import React, { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import Title from "../../component/presenter/text/Title";
import InputItem from "../../component/presenter/item/InputItem";
import { TextInput } from "../../component/presenter/input/TextInput";
import InputBtnItem from "../../component/presenter/item/InputBtnItem";
import { Input } from "../../component/presenter/input/Input";
import Item from "../../component/presenter/item/Item";
import Button from "../../component/presenter/button/Button";
import { ORDINARY } from "../../constant";

function SignUpStep1({ route }) {
    const navigation = useNavigation();
    const [textSecure, setTextSecure] = useState(true);

    const onClick = () => {
        setTextSecure((prev) => !prev);
    };

    const onNextStep = () => {
        navigation.navigate("SignUpStep2", {
            memberType: route?.params?.memberType,
        });
    };

    const takePicture = () => {
        console.log("Take Picture");
    };

    return (
        <FormLayout submitBtnProps={{ value: "다음으로", fn: onNextStep }}>
            <Title value="회원가입" color="#555555" />
            <InputItem
                title={
                    route?.params?.memberType === ORDINARY
                        ? "이름"
                        : "이름 / 상호명"
                }
            >
                <TextInput
                    placeholder={
                        route?.params?.memberType === ORDINARY
                            ? "이름"
                            : "이름 / 상호명"
                    }
                    returnKeyType="next"
                />
            </InputItem>
            <InputBtnItem title="비밀번호 등록" btnTitle="보기" fn={onClick}>
                <Input
                    placeholder="비밀번호"
                    secureTextEntry={textSecure}
                    returnKeyType="done"
                />
            </InputBtnItem>
            {route?.params?.memberType !== ORDINARY ? (
                <>
                    <Item title="사업자 등록증">
                        <View>
                            <Text>사진</Text>
                            <Button value="촬영하기" fn={takePicture} />
                        </View>
                    </Item>
                    <InputItem title="차량 번호">
                        <TextInput
                            placeholder="숫자만 적어주세요"
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                    </InputItem>
                </>
            ) : null}
        </FormLayout>
    );
}

SignUpStep1.propTypes = {};
export default SignUpStep1;
