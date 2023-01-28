import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";
import Title from "../../component/presenter/title/Title";
import Checkbox from "expo-checkbox";
import { fonts, theme } from "../../styles";
import * as Location from "expo-location";
import axios from "axios";
import SignUpContext from "../../Context/SIgnUpContext";

const termsTexts = [
    "만 14세 이상입니다.",
    "서비스 이용약관",
    "개인정보 수집 및 이용 동의",
    "위치 서비스 이용 동의",
    "이벤트 및 할인 혜택 안내 동의",
];

const Container = styled.View`
    flex: 1;
`;

const Wrapper = styled.View`
    padding: 10px 10px 0px 10px;
`;

const Terms = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TermsButton = styled.TouchableOpacity``;

const TermsText = styled.Text`
    font-family: ${(props) => (props.bold ? fonts.contentBold : fonts.content)};
    font-size: ${(props) => (props.bold ? 23 : 19)}px;
    color: ${(props) => (props.bold ? "black" : props.theme.darkFontColor)};
    text-decoration-line: ${(props) =>
        props.underline ? "underline" : "none"};
`;

const GuideText = styled.Text`
    font-size: 18px;
    color: ${theme.darkFontColor};
    bottom: 10px;
    position: absolute;
    font-family: ${fonts.subTitle};
`;

function SignUpStep4() {
    const [checkArr, setCheckArr] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);
    const [isAllChecked, setAllChecked] = useState(false);
    const [blockAllChecked, setBlockAllChecked] = useState(false);
    const [isAgree, setIsAgree] = useState(true);
    const navigation = useNavigation();
    const { info, setInfo } = useContext(SignUpContext);

    console.log("step 4 info : ", info);

    const clickAllCheckButton = (value) => {
        if (value) {
            setAllChecked(true);
            setIsAgree(false);
            const newCheckArr = [true, true, true, true, true];

            setCheckArr(newCheckArr);
            setBlockAllChecked(false);
        } else {
            setAllChecked(false);
            setIsAgree(true);

            if (!blockAllChecked) {
                const newCheckArr = [false, false, false, false, false];

                setCheckArr(newCheckArr);
            } else {
                setBlockAllChecked(false);
            }
        }
    };

    const clickCheckButton = (value, index) => {
        const newCheckArr = [...checkArr];

        newCheckArr[index] = value;

        setCheckArr(newCheckArr);

        const uncheckedArr = newCheckArr.filter((value) => value === false);

        if (uncheckedArr.length < 1) {
            setAllChecked(true);
            setIsAgree(false);
        } else {
            setBlockAllChecked(true);
            setAllChecked(false);

            if (
                uncheckedArr.length === 1 &&
                !newCheckArr[newCheckArr.length - 1]
            ) {
                setIsAgree(false);
            } else {
                setIsAgree(true);
            }
        }
    };

    const onNextStep = async () => {
        navigation.navigate("SignUpStep5");

        //TODO: 빙글빙글 돌아가는 모양넣ㄱ시
        //TODO:자동로그인
        // const {
        //     coords: { latitude, longitude },
        // } = await Location.getCurrentPositionAsync({
        //     accuracy: 5,
        // });

        // const location = await Location.reverseGeocodeAsync(
        //     { latitude, longitude },
        //     { useGoogleMaps: false }
        // );

        // const accessedRegion = `${location[0].city}>${
        //     location[0].subregion ? location[0].subregion : location[0].district
        // }`;

        // // const workCategory=1 //TODO:업종
        // const sendingData = {
        //     sms: true, //TODO:안내 동의
        //     accessedRegion,
        //     ...route?.params?.data,
        // };

        // console.log(sendingData);

        // axios({
        //     url: "https://d367-112-171-113-108.jp.ngrok.io/users/signup",
        //     method: "POST",
        //     header: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json;charset=UTP-8",
        //     },
        //     withCredentials: true,
        //     data: sendingData,
        // }).then(({ data }) => {
        //     console.log(data);
        // });
    };

    const ShowDetailTerms = (index) => {
        navigation.navigate("DetailTerms", {
            index,
            title: termsTexts[index],
        });
    };
    return (
        <SubmitLayout
            submitBtnProps={{
                value: "동의하기",
                onPress: onNextStep,
                disabled: isAgree,
            }}
        >
            <Container>
                <Title value="약관동의" color="#555555" />
                <Wrapper>
                    <Terms>
                        <TermsText bold>전체 동의합니다.</TermsText>
                        <Checkbox
                            style={{ width: 36, height: 36 }}
                            value={isAllChecked}
                            onValueChange={clickAllCheckButton}
                            color={
                                isAllChecked ? theme.btnPointColor : undefined
                            }
                        />
                    </Terms>
                    {termsTexts.map((text, index) => (
                        <Terms key={index}>
                            <TermsButton onPress={() => ShowDetailTerms(index)}>
                                <TermsText
                                    underline={
                                        index === 0 || index === 4
                                            ? false
                                            : true
                                    }
                                >
                                    {text}
                                    {index < 4 ? " (필수)" : ""}
                                </TermsText>
                            </TermsButton>
                            <Checkbox
                                style={{ width: 30, height: 30 }}
                                value={checkArr[index]}
                                onValueChange={(value) => {
                                    clickCheckButton(value, index);
                                }}
                                color={
                                    checkArr[index]
                                        ? theme.btnPointColor
                                        : undefined
                                }
                            />
                        </Terms>
                    ))}
                </Wrapper>
                <GuideText>
                    각 항목 클릭 시 상세 내용을 보실 수 있습니다.
                </GuideText>
            </Container>
        </SubmitLayout>
    );
}

SignUpStep4.propTypes = {};
export default SignUpStep4;
