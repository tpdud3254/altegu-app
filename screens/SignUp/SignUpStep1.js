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
import { ORDINARY, SPECIAL } from "../../constant";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import axios from "axios";

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
    const [license, setLicense] = useState("");
    const { register, handleSubmit, setValue, getValues, watch } = useForm();
    const [availableUser, setAvailableUser] = useState(null);
    const [checked, setChecked] = useState(false);

    const passwordRef = useRef();
    const vehicleNumberRef = useRef();
    const recommendUserNameRef = useRef();
    const recommendUserPhoneRef = useRef();
    const checkResult1 = useRef();
    const checkResult2 = useRef();

    console.log(route);
    useEffect(() => {
        setLicense(route?.params?.file);
    }, []);

    useEffect(() => {
        register("name", {
            required: true,
        });
        register("password", {
            required: true,
        });

        if (route?.params?.memberType !== ORDINARY) {
            register("vehicleNumber", {
                // required: true,
            });
            register("recommendUserName");
            register("recommendUserPhone");
        }
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
                license,
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

        if (route?.params?.memberType === SPECIAL) {
            // if (!license) {
            //     Toast.show({
            //         type: "error",
            //         text1: "사업자 등록증을 등록해주세요.",
            //     });
            //     return;
            // }
        }
        onNextStep(data);
    };

    const checkRecommnedUser = (phone) => {
        // try {
        //     // GET 요청은 params에 실어 보냄
        //   const response = await axios.get('/user', {
        //       params: {
        //           ID: 12345
        //       }
        //   });

        //   // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.

        //   await axios.get('/user?ID=12345'); // 위의 요청과 동일

        //   var userId = 12345;
        //   await axios.get(`/user?ID=${userId}`); // Backtick(`)을 이용해 이렇게 요청할 수도 있다.

        //   console.log(response);
        // } catch (e) {
        //   // 실패 시 처리
        //   console.error(e);
        // }

        if (phone.length > 10) {
            console.log(phone);
            setChecked(true);
            // axios({
            //     url: `https://d367-112-171-113-108.jp.ngrok.io/users/check-user?phone=${phone}`,
            //     method: "GET",
            //     header: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json;charset=UTP-8",
            //     },
            //     withCredentials: true,
            // }).then(({ data }) => {
            //     console.log(data);
            //     setChecked(true);
            //     if (data.massage === "success") {
            //         setAvailableUser(true);
            //         checkResult1?.current?.focus();
            //     } else {
            //         setAvailableUser(false);
            //         checkResult2?.current?.focus();
            //     }
            // });
        }

        // axios
        //     .get(
        //         "https://84de-2001-e60-3165-3af4-40cf-ac2f-cbf8-a0ea.jp.ngrok.io/users/checkUser",
        //         {
        //             params: {
        //                 phone,
        //             },
        //         }
        //     )
        //     .then(function (response) {
        //         // response
        //     })
        //     .catch(function (error) {
        //         // 오류발생시 실행
        //     })
        //     .then(function () {
        //         // 항상 실행
        //     });
    };
    return (
        <FormLayout
            submitBtnProps={{
                value: "다음으로",
                fn: handleSubmit(onValid),
                disabled: !(
                    (watch("name") && watch("password"))
                    // watch("vehicleNumber")
                ),
            }}
            keyboardVerticalOffset={
                route?.params?.memberType === ORDINARY ? 0 : 0
            }
        >
            <Title value="회원가입" color="#555555" />
            <ScrollView style={{ marginBottom: 0 }}>
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
                                : "이름 / 상호명 (2자리 이상)"
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
                        returnKeyType={
                            route?.params?.memberType === ORDINARY
                                ? "done"
                                : "next"
                        }
                        onSubmitEditing={
                            route?.params?.memberType === ORDINARY
                                ? null
                                : () => onNext(vehicleNumberRef)
                        }
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
                                ref={vehicleNumberRef}
                                placeholder="숫자만 적어주세요"
                                keyboardType="number-pad"
                                returnKeyType="next"
                                onChangeText={(text) =>
                                    setValue("vehicleNumber", text)
                                }
                                onSubmitEditing={() =>
                                    onNext(recommendUserNameRef)
                                }
                            />
                        </InputItem>
                        <Item title="추천 기사님 정보">
                            <RowContainer>
                                <TextInput
                                    ref={recommendUserNameRef}
                                    placeholder="성함 / 상호명"
                                    returnKeyType="next"
                                    width="39%"
                                    onChangeText={(text) =>
                                        setValue("recommendUserName", text)
                                    }
                                    onSubmitEditing={() =>
                                        onNext(recommendUserPhoneRef)
                                    }
                                />
                                <TextInput
                                    ref={recommendUserPhoneRef}
                                    placeholder="휴대폰 번호"
                                    returnKeyType="done"
                                    width="59%"
                                    onChangeText={(text) => {
                                        setValue("recommendUserPhone", text);
                                        checkRecommnedUser(text);
                                    }}
                                    keyboardType="number-pad"
                                />
                            </RowContainer>

                            {checked ? (
                                false ? (
                                    <TextContainer ref={checkResult1}>
                                        <RecommenderText>
                                            {getValues("recommendUserName")}
                                        </RecommenderText>
                                        <RecommenderText>
                                            {getValues("recommendUserPhone")}
                                        </RecommenderText>
                                        <Ionicons
                                            name="checkmark"
                                            color={theme.sub.green}
                                            size={30}
                                        />
                                    </TextContainer>
                                ) : (
                                    <TextContainer ref={checkResult2}>
                                        <RecommenderText
                                            style={{ color: "red" }}
                                        >
                                            올바른 번호 혹은 성함을 입력해
                                            주세요.
                                        </RecommenderText>
                                    </TextContainer>
                                )
                            ) : null}

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
