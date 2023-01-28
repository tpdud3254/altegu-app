import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";
import Title from "../../component/presenter/title/Title";
import SignUpContext from "../../Context/SIgnUpContext";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../component/presenter/logo/Logo";
import TruckLogo from "../../component/presenter/logo/TruckLogo";
import { ORDINARY, PERSON } from "../../constant";
import VerticalDivider from "../../component/presenter/divider/VerticalDivider";
import { theme } from "../../styles";

function SignUpStep5({ navigation }) {
    const { info, setInfo } = useContext(SignUpContext);

    console.log("step 5 info : ", info);

    useEffect(() => {
        navigation.setOptions({});
    });

    const onNextStep = () => {
        console.log("done");
        //TODOS:로그인 설정 (로그인 후 로그인 변수 true)
        // navigation.navigate("Home");
    };
    //TODO:back누르면 홈으로
    return (
        <DefaultLayout>
            <View>
                <Text>회원가입 완료</Text>
                <TouchableOpacity>
                    <Ionicons name={"close"} size={30} color={"black"} />
                </TouchableOpacity>
            </View>
            <View>
                <Text>회원 가입이 완료되었습니다.</Text>
                <Logo />
                <TruckLogo />
                <Text>환영합니다</Text>
                <Text>회원님의 아이디는{"\n"}000-0000-0000입니다.</Text>

                <Text>
                    {info.userType === ORDINARY
                        ? `지금부터 알테구 작업 리스트 보기 및 작업 등록이 가능합니다.\n최초 작업 등록 시 10,000P가 적립될 예정입니다.`
                        : info.userDetailType === PERSON
                        ? `지금부터 알테구 작업 리스트 보기, 작업 등록 및 작업예약이 가능합니다.\n최초 작업 등록 시 10,000P가 적립될 예정입니다.`
                        : `지금부터 알테구 작업 리스트 보기 및 작업 등록이 가능합니다.\n최초 작업 등록 시 10,000P가 적립될 예정입니다.`}
                </Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>작업등록 하기</Text>
                </TouchableOpacity>
                <VerticalDivider color={theme.textBoxColor} />
                <TouchableOpacity>
                    <Text>
                        {info.userType === ORDINARY
                            ? "가입정보 보기"
                            : info.userDetailType === PERSON
                            ? "작업요청 보기"
                            : "가입정보 보기"}
                    </Text>
                </TouchableOpacity>
            </View>
        </DefaultLayout>
    );
}

SignUpStep5.propTypes = {};
export default SignUpStep5;
