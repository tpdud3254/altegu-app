import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
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
import styled from "styled-components/native";
import PropTypes from "prop-types";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

const ImageContainer = styled.View`
    min-height: 200px;
    border: 1px solid #00000055;
    justify-content: center;
    align-items: center;
`;

const NoImageText = styled.Text`
    font-size: 20px;
`;

const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const TextContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
`;

const RecommenderText = styled.Text`
    font-size: 20px;
`;

function SignUpStep1({ route }) {
    const navigation = useNavigation();
    const [textSecure, setTextSecure] = useState(true);
    const { register, handleSubmit, setValue, getValues, watch } = useForm();

    const passwordRef = useRef();

    useEffect(() => {
        register("name", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register]);

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onClick = () => {
        setTextSecure((prev) => !prev);
    };

    const onNextStep = (data) => {
        navigation.navigate("SignUpStep2", {
            memberType: route?.params?.memberType, //TODO: Redux 적용
            data: {
                userType: route?.params?.memberType,
                ...data,
            },
        });
    };

    const takePicture = () => {
        navigation.navigate("TakePhoto", {
            memberType: route?.params?.memberType, //TODO: Redux 적용
        });
    };

    const onCompleted = (data) => {
        const {
            createAccount: { ok },
        } = data;

        const { userName, password } = getValues();
        if (ok) {
            navigation.navigate(nav.LogIn, {
                userName,
                password,
            });
        }
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

        onNextStep({ name, password });
    };

    return (
        <FormLayout
            submitBtnProps={{
                value: "다음으로",
                fn: handleSubmit(onValid),
                disabled: !(watch("name") && watch("password")),
            }}
            keyboardVerticalOffset={
                route?.params?.memberType === ORDINARY ? 0 : 80
            }
        >
            <Title value="회원가입" color="#555555" />
            <ScrollView style={{ marginBottom: 55 }}>
                <InputItem
                    title={
                        route?.params?.memberType === ORDINARY
                            ? "이름"
                            : "이름 / 상호명"
                    }
                >
                    <TextInput
                        autoFocus={true}
                        placeholder={
                            route?.params?.memberType === ORDINARY
                                ? "이름 (2자리 이상)"
                                : "이름 / 상호명"
                        }
                        returnKeyType="next"
                        onSubmitEditing={() => onNext(passwordRef)}
                        onChangeText={(text) => setValue("name", text)}
                    />
                </InputItem>
                <InputBtnItem
                    title="비밀번호 등록"
                    btnTitle="보기"
                    fn={onClick}
                >
                    <Input
                        ref={passwordRef}
                        placeholder="비밀번호 (8자리 이상)"
                        secureTextEntry={textSecure}
                        returnKeyType="done"
                        onChangeText={(text) => setValue("password", text)}
                    />
                </InputBtnItem>
                {route?.params?.memberType !== ORDINARY ? (
                    <>
                        <Item title="사업자 등록증">
                            <View>
                                <ImageContainer>
                                    {route?.params?.file ? (
                                        <AutoHeightImage
                                            width={150}
                                            source={{
                                                uri: route?.params?.file,
                                            }}
                                        ></AutoHeightImage>
                                    ) : (
                                        <NoImageText>
                                            사진을 등록해주세요
                                        </NoImageText>
                                    )}
                                </ImageContainer>

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
                        <Item title="추천 기사님 정보">
                            <RowContainer>
                                <TextInput
                                    placeholder="성함 / 상호명"
                                    returnKeyType="next"
                                    width="39%"
                                />
                                <TextInput
                                    placeholder="휴대폰 번호"
                                    returnKeyType="next"
                                    width="59%"
                                />
                            </RowContainer>

                            {true ? null : (
                                <TextContainer>
                                    <RecommenderText>홍길동</RecommenderText>
                                    <RecommenderText>
                                        010-1234-5678
                                    </RecommenderText>
                                    <Ionicons
                                        name="checkmark"
                                        color={theme.sub.green}
                                        size={30}
                                    />
                                </TextContainer>
                            )}

                            {true ? null : (
                                <TextContainer>
                                    <RecommenderText style={{ color: "red" }}>
                                        올바른 번호 혹은 성함을 입력해 주세요.
                                    </RecommenderText>
                                </TextContainer>
                            )}
                            {/* TODO:기능추가 */}
                        </Item>
                    </>
                ) : null}
            </ScrollView>
        </FormLayout>
    );
}

SignUpStep1.propTypes = {
    file: PropTypes.string,
};
export default SignUpStep1;
