import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Alert,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import Title from "../../component/presenter/title/Title";
import InputItem from "../../component/presenter/item/InputItem";
import { TextInput } from "../../component/presenter/input/TextInput";
import InputBtnItem from "../../component/presenter/item/InputBtnItem";
import { Input } from "../../component/presenter/input/Input";
import Item from "../../component/presenter/item/Item";
import Button from "../../component/presenter/button/Button";
import { COMPANY, ORDINARY, PERSON, SPECIAL } from "../../constant";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import axios from "axios";
import OrdinarySignUp from "./OrdinarySignUp";
import SubmitButton from "../../component/presenter/button/SubmitButton";
import CircleButton from "../../component/presenter/button/CircleButton";
import VerticalDivider from "../../component/presenter/divider/VerticalDivider";
import SubTitleText from "../../component/presenter/text/SubTitleText";
import ContentText from "../../component/presenter/text/ContentText";
import SignUpContext, { SignUpConsumer } from "../../Context/SIgnUpContext";
import { SERVER } from "../../server";
import { checkPassword } from "../../utils";

const ButtonContainer = styled.View``;

const ButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    height: 60px;
`;

const SelectButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 48%;
    height: 100%;
    background-color: ${(props) =>
        props.checked ? theme.btnPointColor + "66" : "white"};
`;

const Selected = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${(props) => props.color};
`;

const buttonProps = {
    fontSize: 22,
    color: "#555555",
};

const LicenseContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: -5px;
    margin-bottom: -5px;
`;

const License = styled.View`
    width: 79%;
    border: 1px solid ${theme.textBoxColor};
    justify-content: center;
    align-items: center;
    height: 52px;
`;

const LicenseText = styled.Text`
    width: 95%;
    font-size: 18px;
`;

const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Icon = styled.View`
    justify-content: center;
    align-items: center;
    width: 20%;
`;

function SpecialSignUp({ route }) {
    const navigation = useNavigation();
    const [detailType, setDetailType] = useState("");
    const [textSecure, setTextSecure] = useState(true);
    const { register, handleSubmit, setValue, getValues, watch } = useForm();
    const [checked, setChecked] = useState(false);
    const [checkUser, setCheckUser] = useState(false); //유저 유효성검사
    const { info, setInfo } = useContext(SignUpContext);
    const [recommendUserId, setRecommendUserId] = useState(null);

    const passwordRef = useRef();
    const vehicleNumberRef = useRef();
    const recommendUserPhoneRef = useRef();

    console.log("info : ", info);

    useEffect(() => {
        register("name", {
            required: true,
        });
        register("password", {
            required: true,
        });

        if (route?.params?.memberType !== ORDINARY) {
            register("vehicleNumber");
            register("recommendUserPhone");
        }
    }, [register]);

    const SelectDetailType = (type) => {
        setDetailType(type);
    };

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const showPassword = () => {
        setTextSecure((prev) => !prev);
    };

    const takePicture = () => {
        navigation.navigate("TakePhoto");
    };

    const onNextStep = (data) => {
        const { name, password, vehicleNumber } = data;

        const newData = {
            name,
            password,
            vehicleNumber,
            recommendUserId,
            userDetailType: detailType,
        };
        setInfo({ ...newData, ...info });
        navigation.navigate("SignUpStep2");
    };

    const onValid = (data) => {
        if (detailType === "") {
            Toast.show({
                type: "error",
                text1: "사업 종류를 선택해주세요.",
            });
            return;
        }

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

        if (!checkPassword(data.password)) {
            Toast.show({
                type: "error",
                text1: "비밀번호가 조건에 맞지 않습니다.",
            });

            return;
        }

        if (!info.licenseUrl || info.licenseUrl === "") {
            Toast.show({
                type: "error",
                text1: "사업자 등록증을 등록해주세요.",
            });

            return;
        }

        if (!data.vehicleNumber || data.vehicleNumber === "") {
            //TODO: 정책 결정 후 수정
            Toast.show({
                type: "error",
                text1: "차량 번호를 등록해주세요.",
            });

            return;
        }

        onNextStep(data);
    };

    const checkRecommnedUser = async (phone) => {
        if (phone.length > 10) {
            console.log(phone);
            setChecked(true);

            axios({
                url: SERVER + `/users/check?phone=${phone}`,
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTP-8",
                },
                withCredentials: true,
            })
                .then(async ({ data }) => {
                    const { result, userId } = data;

                    if (result) {
                        setRecommendUserId(userId);
                    }

                    setCheckUser(result);
                })
                .catch((e) => {
                    console.error(e);
                })
                .then(() => {});
        }
    };

    return (
        <FormLayout keyboardVerticalOffset={0}>
            <Title value="회원가입" />
            <ScrollView>
                <TouchableWithoutFeedback>
                    <View style={{ marginBottom: 20 }}>
                        <ButtonContainer>
                            <ButtonWrapper>
                                <SelectButton
                                    onPress={() => {
                                        SelectDetailType(PERSON);
                                    }}
                                    checked={
                                        detailType === PERSON ? true : false
                                    }
                                >
                                    <SubTitleText style={buttonProps}>
                                        기사회원
                                    </SubTitleText>
                                </SelectButton>
                                <VerticalDivider color="#cccccc" />
                                <SelectButton
                                    onPress={() => {
                                        SelectDetailType(COMPANY);
                                    }}
                                    checked={
                                        detailType === COMPANY ? true : false
                                    }
                                >
                                    <SubTitleText style={buttonProps}>
                                        기업회원
                                    </SubTitleText>
                                </SelectButton>
                            </ButtonWrapper>
                            <Selected
                                color={
                                    detailType !== ""
                                        ? theme.btnPointColor
                                        : theme.textBoxColor
                                }
                            >
                                <Ionicons
                                    name={"checkmark-circle"}
                                    size={30}
                                    color={"rgba(1,1,1,0.0)"}
                                />
                                <SubTitleText style={{ fontSize: 18 }}>
                                    사업 종류 선택
                                </SubTitleText>
                                <Ionicons
                                    name={"checkmark-circle"}
                                    size={30}
                                    color={
                                        detailType !== ""
                                            ? theme.btnPointColor
                                            : theme.textBoxColor
                                    }
                                />
                            </Selected>
                        </ButtonContainer>
                        <InputItem title="이름 / 상호명">
                            <TextInput
                                placeholder="이름 / 상호명 (2자리 이상)"
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
                                onChangeText={(text) =>
                                    setValue("password", text)
                                }
                            />
                        </InputBtnItem>
                        <ContentText
                            style={{
                                fontSize: 18,
                                marginTop: -10,
                                marginBottom: -20,
                                color: theme.darkFontColor,
                            }}
                        >
                            * 영문, 숫자를 포함한 8자 이상의 문자열
                        </ContentText>

                        <Item title="사업자 등록증">
                            <LicenseContainer>
                                <License>
                                    <LicenseText numberOfLines={1}>
                                        <SignUpConsumer>
                                            {(data) => {
                                                if (data?.info?.licenseUrl) {
                                                    const uri =
                                                        data.info.licenseUrl;

                                                    const uriArr =
                                                        uri.split("/");

                                                    return uriArr[
                                                        uriArr.length - 1
                                                    ];
                                                }
                                                return "사진을 등록해주세요.";
                                            }}
                                        </SignUpConsumer>
                                    </LicenseText>
                                </License>
                                <Button
                                    value="촬영"
                                    fn={takePicture}
                                    width="19%"
                                    height="52px"
                                />
                            </LicenseContainer>
                        </Item>
                        <Item title="추천회원님 정보">
                            <RowContainer>
                                <TextInput
                                    ref={recommendUserPhoneRef}
                                    placeholder="휴대폰 번호"
                                    returnKeyType="next"
                                    width="80%"
                                    onChangeText={(text) => {
                                        setValue("recommendUserPhone", text);
                                        checkRecommnedUser(text);
                                    }}
                                    onSubmitEditing={() =>
                                        onNext(vehicleNumberRef)
                                    }
                                    keyboardType="number-pad"
                                />
                                <Icon>
                                    {checked ? (
                                        checkUser ? (
                                            <Ionicons
                                                name={"checkmark-circle"}
                                                size={40}
                                                color={"#33aa11"}
                                            />
                                        ) : (
                                            <Ionicons
                                                name={"close-circle"}
                                                size={41}
                                                color={"#cc2222"}
                                            />
                                        )
                                    ) : (
                                        <Ionicons
                                            name={"checkmark-circle"}
                                            size={40}
                                            color={"#33aa1155"}
                                        />
                                    )}
                                </Icon>
                            </RowContainer>
                        </Item>

                        <InputItem title="차량 번호">
                            <TextInput
                                ref={vehicleNumberRef}
                                placeholder="작업 진행을 원하실 경우 기재해주세요."
                                returnKeyType="done"
                                onChangeText={(text) =>
                                    setValue("vehicleNumber", text)
                                }
                            />
                        </InputItem>
                    </View>
                </TouchableWithoutFeedback>
                <SubmitButton
                    value="다음으로"
                    onPress={handleSubmit(onValid)}
                    disabled={!(watch("name") && watch("password"))}
                />
            </ScrollView>
        </FormLayout>
    );
}

SpecialSignUp.propTypes = {
    file: PropTypes.string,
};
export default SpecialSignUp;
