import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";
import Title from "../../component/presenter/text/Title";
import Button from "../../component/presenter/button/Button";
import { theme } from "../../styles";

const MapContainer = styled.View`
    min-height: 300px;
    border: 1px solid #dddddd;
    justify-content: center;
    align-items: center;
`;

const Map = styled.View``;
const ButtonContainer = styled.View``;

const ButtonRow = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

const GuideTextContainer = styled.View`
    align-items: center;
`;
const GuideText = styled.Text`
    font-weight: 600;
    font-size: 20px;
    color: ${theme.darkFontColor};
    margin-top: 3px;
`;

function SignUpStep3({ route }) {
    const navigation = useNavigation();

    console.log("member type : ", route?.params?.memberType);

    const onNextStep = () => {
        navigation.navigate("SignUpStep4", {
            memberType: route?.params?.memberType,
        });
    };
    return (
        <SubmitLayout submitBtnProps={{ value: "다음으로", fn: onNextStep }}>
            <Title value="작업지역 선택하기" color="#555555" />
            <MapContainer>
                <Map>
                    <Text>지도</Text>
                </Map>
            </MapContainer>
            <ButtonContainer>
                <ButtonRow>
                    <Button
                        value="서울시"
                        color={theme.sub.yellow}
                        textSize="23"
                        width="47%"
                    />
                    <Button
                        value="인천시"
                        color={theme.sub.yellow}
                        textSize="23"
                        width="47%"
                    />
                </ButtonRow>
                <ButtonRow>
                    <Button
                        value="경기 북서부"
                        color={theme.sub.yellow}
                        textSize="23"
                        width="47%"
                    />
                    <Button
                        value="경기 북동부"
                        color={theme.sub.yellow}
                        textSize="23"
                        width="47%"
                    />
                </ButtonRow>
                <ButtonRow>
                    <Button
                        value="경기 남서부"
                        color={theme.sub.yellow}
                        textSize="23"
                        width="47%"
                    />
                    <Button
                        value="경기 남동부"
                        color={theme.sub.yellow}
                        textSize="23"
                        width="47%"
                    />
                </ButtonRow>
            </ButtonContainer>
            <GuideTextContainer>
                <GuideText>
                    작업지역은 언제든지 추가, 제거 및 변경이 가능합니다.
                </GuideText>
                <GuideText>작업을 희망하시는 위치를 선택해 주세요.</GuideText>
            </GuideTextContainer>
        </SubmitLayout>
    );
}

SignUpStep3.propTypes = {};
export default SignUpStep3;
