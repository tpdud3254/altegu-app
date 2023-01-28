import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";
import Title from "../../component/presenter/title/Title";
import Button from "../../component/presenter/button/Button";
import { theme } from "../../styles";
import SignUpContext from "../../Context/SIgnUpContext";
import ContentText from "../../component/presenter/text/ContentText";

const Container = styled.View`
    justify-content: space-between;
`;
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

const BtnProps = {
    textSize: 23,
    width: "47%",
};

const GuideTextContainer = styled.View`
    width: 100%;
    align-items: center;
`;

function SignUpStep3() {
    const navigation = useNavigation();
    const [regionArr, setRegionArr] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const { info, setInfo } = useContext(SignUpContext);

    console.log("step 3 info : ", info);

    const onNextStep = () => {
        const workRegion = [];

        regionArr.map((value, index) => {
            if (value) {
                workRegion.push(index + 1);
            }
        });

        setInfo({ workRegion, ...info });

        navigation.navigate("SignUpStep4");
    };

    const onPress = (index) => {
        const prevArr = [...regionArr];

        prevArr[index] = !prevArr[index];

        setRegionArr(prevArr);
    };

    return (
        <SubmitLayout
            submitBtnProps={{ value: "다음으로", onPress: onNextStep }}
        >
            <Container>
                <Title value="작업지역 선택하기" />
                <MapContainer>
                    <Map>
                        <Text>지도</Text>
                    </Map>
                </MapContainer>
                <ButtonContainer>
                    <ButtonRow>
                        <Button
                            value="서울시"
                            color={
                                regionArr[0] ? theme.sub.yellow : theme.btnColor
                            }
                            fn={() => {
                                onPress(0);
                            }}
                            {...BtnProps}
                        />
                        <Button
                            value="인천시"
                            color={
                                regionArr[1] ? theme.sub.yellow : theme.btnColor
                            }
                            fn={() => {
                                onPress(1);
                            }}
                            {...BtnProps}
                        />
                    </ButtonRow>
                    <ButtonRow>
                        <Button
                            value="경기 북서부"
                            color={
                                regionArr[2] ? theme.sub.yellow : theme.btnColor
                            }
                            fn={() => {
                                onPress(2);
                            }}
                            {...BtnProps}
                        />
                        <Button
                            value="경기 북동부"
                            color={
                                regionArr[3] ? theme.sub.yellow : theme.btnColor
                            }
                            fn={() => {
                                onPress(3);
                            }}
                            {...BtnProps}
                        />
                    </ButtonRow>
                    <ButtonRow>
                        <Button
                            value="경기 남서부"
                            color={
                                regionArr[4] ? theme.sub.yellow : theme.btnColor
                            }
                            fn={() => {
                                onPress(4);
                            }}
                            {...BtnProps}
                        />
                        <Button
                            value="경기 남동부"
                            color={
                                regionArr[5] ? theme.sub.yellow : theme.btnColor
                            }
                            fn={() => {
                                onPress(5);
                            }}
                            {...BtnProps}
                        />
                    </ButtonRow>
                </ButtonContainer>
                <GuideTextContainer>
                    <ContentText
                        style={{
                            fontSize: 17,
                            color: theme.darkFontColor,
                        }}
                    >
                        작업을 희망하시는 위치를 선택해 주세요.{"\n"}
                        작업지역은 언제든지 추가, 제거 및 변경이 가능합니다.
                    </ContentText>
                </GuideTextContainer>
            </Container>
        </SubmitLayout>
    );
}

SignUpStep3.propTypes = {};
export default SignUpStep3;
