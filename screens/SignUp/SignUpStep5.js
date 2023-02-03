import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import SignUpContext from "../../Context/SIgnUpContext";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../component/presenter/logo/Logo";
import TruckLogo from "../../component/presenter/logo/TruckLogo";
import { ORDINARY, PERSON } from "../../constant";
import VerticalDivider from "../../component/presenter/divider/VerticalDivider";
import { theme } from "../../styles";
import SubTitleText from "../../component/presenter/text/SubTitleText";
import TitleText from "../../component/presenter/text/TitleText";
import ContentText from "../../component/presenter/text/ContentText";
import HorizontalDivider from "../../component/presenter/divider/HorizontalDivider";
import { BackHandler } from "react-native";
import { SERVER } from "../../server";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IsLoggedInContext from "../../Context/IsLoggedInContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setLogin } from "../../utils";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
`;
const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
`;
const HeaderButton = styled.TouchableOpacity``;

const Content = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    height: 100px;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
`;
const Button = styled.TouchableOpacity``;

function SignUpStep5() {
    const { info, setInfo } = useContext(SignUpContext);
    const { setIsLoggedIn } = useContext(IsLoggedInContext);

    console.log("step 5 info : ", info);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onNextStep);
    });

    const onNextStep = () => {
        signIn();
        return true;
    };

    const signIn = () => {
        const { phone, password } = info;

        console.log(phone);
        console.log(password);
        axios({
            url: SERVER + "/users/sign-in",
            method: "POST",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTP-8",
            },
            withCredentials: true,
            data: { phone, password },
        }).then(async ({ data }) => {
            const { result, token, msg, user } = data;
            if (result) {
                // setLogin(token, user.id, user);
                setInfo(user);
                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("userId", user.id + "");
                setIsLoggedIn(true);
            } else {
                Toast.show({
                    type: "error",
                    text1: msg,
                });
            }
        });
    };
    return (
        <DefaultLayout>
            <Container>
                <Header>
                    <Ionicons
                        name={"close-outline"}
                        size={45}
                        color={"white"}
                    />
                    <TitleText style={{ fontSize: 23 }}>
                        회원가입 완료
                    </TitleText>
                    <HeaderButton onPress={onNextStep}>
                        <Ionicons
                            name={"close-outline"}
                            size={45}
                            color={"black"}
                        />
                    </HeaderButton>
                </Header>
                <HorizontalDivider color={"#dedede"} />
                <Content>
                    <SubTitleText
                        style={{ fontSize: 23, color: theme.btnPointColor }}
                    >
                        회원 가입이 완료되었습니다
                    </SubTitleText>
                    <Logo />
                    <TruckLogo />
                    <SubTitleText style={{ fontSize: 30 }}>
                        환영합니다
                    </SubTitleText>
                    <SubTitleText
                        style={{
                            fontSize: 20,
                            color: theme.btnPointColor,
                            textAlign: "center",
                        }}
                    >
                        회원님의 아이디는{"\n"}
                        {info.phone} 입니다
                    </SubTitleText>

                    <ContentText
                        style={{
                            fontSize: 16,
                            textAlign: "center",
                            color: "#555555",
                            backgroundColor: theme.sub.yellow + "33",
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 10,
                        }}
                    >
                        {info.userType === ORDINARY
                            ? `지금부터 알테구 작업 리스트 보기 및\n작업 등록이 가능합니다.\n최초 작업 등록 시 10,000P가 적립될 예정입니다.`
                            : info.userDetailType === PERSON
                            ? `지금부터 알테구 작업 리스트 보기, 작업 등록 및 작업예약이 가능합니다.\n최초 작업 등록 시 10,000P가 적립될 예정입니다.`
                            : `지금부터 알테구 작업 리스트 보기 및 작업 등록이 가능합니다.\n최초 작업 등록 시 10,000P가 적립될 예정입니다.`}
                    </ContentText>
                </Content>
                <HorizontalDivider color={"#dedede"} />
                <ButtonContainer>
                    <Button>
                        {/* TODO: 기능추가 */}
                        <SubTitleText style={{ fontSize: 20 }}>
                            작업등록 하기
                        </SubTitleText>
                    </Button>
                    <VerticalDivider color={theme.textBoxColor} />
                    <Button>
                        {/* TODO: 기능추가 */}
                        <SubTitleText style={{ fontSize: 20 }}>
                            {info.userType === ORDINARY
                                ? "가입정보 보기"
                                : info.userDetailType === PERSON
                                ? "작업요청 보기"
                                : "가입정보 보기"}
                        </SubTitleText>
                    </Button>
                </ButtonContainer>
            </Container>
        </DefaultLayout>
    );
}

SignUpStep5.propTypes = {};
export default SignUpStep5;
