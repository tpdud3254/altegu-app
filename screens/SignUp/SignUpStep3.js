import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {
    Image,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";
import Title from "../../component/presenter/title/Title";
import Button from "../../component/presenter/button/Button";
import { theme } from "../../styles";
import SignUpContext from "../../Context/SIgnUpContext";
import ContentText from "../../component/presenter/text/ContentText";
import SubTitleText from "../../component/presenter/text/SubTitleText";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Container = styled.View`
    /* justify-content: space-between; */
`;
const MapContainer = styled.View`
    margin-top: 10px;
    width: 100%;
    min-height: 450px;
    /* border: 1px solid #dddddd; */
    justify-content: center;
    align-items: center;
`;

const Map = styled.View`
    width: 364px;
    height: 482px;
`;

const MapButton = styled.TouchableOpacity`
    position: absolute;
    z-index: 1;
    background-color: #ffffffbb;
    padding: 5px;
    border-radius: 5px;
`;

const GuideTextContainer = styled.View`
    width: 100%;
    align-items: center;
`;

const imageSize = {
    //실제 이미지 크기
    1: [231, 190],
    2: [113, 197],
    3: [396, 631],
    4: [415, 504],
    5: [294, 445],
    6: [492, 576],
};

function SignUpStep3() {
    const navigation = useNavigation();
    const [adjustedImage, setAdjustedImage] = useState({}); //조정된 이미지 크기
    const [imageResized, setImageResized] = useState(false); //이미지 resize 여부

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

    useEffect(() => {
        const firstImageWidth = 180;

        let widthArr = [];

        for (let i = 0; i < 6; i++) {
            const width =
                (firstImageWidth * imageSize[i + 1][0]) / imageSize[3][0];
            widthArr.push(width);
        }

        let height = [];

        widthArr.map((value, index) => {
            const size =
                (imageSize[index + 1][1] * value) / imageSize[index + 1][0];

            height.push(size);
        });

        const adjustedObj = { width: widthArr, height: height };

        setAdjustedImage(adjustedObj);
        setImageResized(true);
    }, []);

    const onNextStep = () => {
        const workRegion = [];

        regionArr.map((value, index) => {
            if (value) {
                workRegion.push(index + 1);
            }
        });

        if (workRegion.length < 1) {
            Toast.show({
                type: "error",
                text1: "작업 지역을 선택해주세요.",
            });

            return;
        }
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
                    {imageResized ? (
                        <Map>
                            <MapButton
                                style={{
                                    top: 240,
                                    left: 98,
                                }}
                                onPress={() => {
                                    onPress(0);
                                }}
                            >
                                <SubTitleText style={{ fontSize: 20 }}>
                                    서울시
                                </SubTitleText>
                            </MapButton>
                            <Image //서울
                                style={{
                                    resizeMode: "contain",
                                    width: adjustedImage.width[0],
                                    height: adjustedImage.height[0],
                                    position: "absolute",
                                    top: 206,
                                    left: 75,
                                }}
                                source={
                                    regionArr[0]
                                        ? require(`../../assets/images/map/selected1.png`)
                                        : require(`../../assets/images/map/unselected1.png`)
                                }
                            />
                            <MapButton
                                style={{
                                    top: 259,
                                    left: 10,
                                }}
                                onPress={() => {
                                    onPress(1);
                                }}
                            >
                                <SubTitleText style={{ fontSize: 20 }}>
                                    인천시
                                </SubTitleText>
                            </MapButton>
                            <Image //인천
                                style={{
                                    resizeMode: "contain",
                                    width: adjustedImage.width[1],
                                    height: adjustedImage.height[1],
                                    position: "absolute",
                                    top: 229,
                                    left: 21,
                                }}
                                source={
                                    regionArr[1]
                                        ? require(`../../assets/images/map/selected2.png`)
                                        : require(`../../assets/images/map/unselected2.png`)
                                }
                            />
                            <MapButton
                                style={{
                                    top: 150,
                                    left: 10,
                                }}
                                onPress={() => {
                                    onPress(2);
                                }}
                            >
                                <SubTitleText style={{ fontSize: 20 }}>
                                    경기 북서부
                                </SubTitleText>
                            </MapButton>
                            <Image //북서부
                                style={{
                                    resizeMode: "contain",
                                    width: adjustedImage.width[2],
                                    height: adjustedImage.height[2],
                                    position: "absolute",
                                    left: 2,
                                }}
                                source={
                                    regionArr[2]
                                        ? require(`../../assets/images/map/selected3.png`)
                                        : require(`../../assets/images/map/unselected3.png`)
                                }
                            />
                            <MapButton
                                style={{
                                    top: 150,
                                    left: 150,
                                }}
                                onPress={() => {
                                    onPress(3);
                                }}
                            >
                                <SubTitleText style={{ fontSize: 20 }}>
                                    경기 북동부
                                </SubTitleText>
                            </MapButton>
                            <Image //북동부
                                style={{
                                    resizeMode: "contain",
                                    width: adjustedImage.width[3],
                                    height: adjustedImage.height[3],
                                    position: "absolute",
                                    left: 109,
                                    top: 38,
                                }}
                                source={
                                    regionArr[3]
                                        ? require(`../../assets/images/map/selected4.png`)
                                        : require(`../../assets/images/map/unselected4.png`)
                                }
                            />
                            <MapButton
                                style={{
                                    top: 357,
                                    left: 41,
                                }}
                                onPress={() => {
                                    onPress(4);
                                }}
                            >
                                <SubTitleText style={{ fontSize: 20 }}>
                                    경기 남서부
                                </SubTitleText>
                            </MapButton>
                            <Image //남서부
                                style={{
                                    resizeMode: "contain",
                                    width: adjustedImage.width[4],
                                    height: adjustedImage.height[4],
                                    position: "absolute",
                                    top: 276,
                                    left: 41,
                                }}
                                source={
                                    regionArr[4]
                                        ? require(`../../assets/images/map/selected5.png`)
                                        : require(`../../assets/images/map/unselected5.png`)
                                }
                            />
                            <MapButton
                                style={{
                                    top: 318,
                                    left: 190,
                                }}
                                onPress={() => {
                                    onPress(5);
                                }}
                            >
                                <SubTitleText style={{ fontSize: 20 }}>
                                    경기 남동부
                                </SubTitleText>
                            </MapButton>
                            <Image //남동부
                                style={{
                                    resizeMode: "contain",
                                    width: adjustedImage.width[5],
                                    height: adjustedImage.height[5],
                                    position: "absolute",
                                    top: 218,
                                    left: 140,
                                }}
                                source={
                                    regionArr[5]
                                        ? require(`../../assets/images/map/selected6.png`)
                                        : require(`../../assets/images/map/unselected6.png`)
                                }
                            />
                        </Map>
                    ) : null}
                </MapContainer>
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
