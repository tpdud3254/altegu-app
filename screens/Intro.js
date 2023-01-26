import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Image, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import CircleButton from "../component/presenter/button/CircleButton";
import VerticalDivider from "../component/presenter/divider/VerticalDivider";
import { theme } from "../styles";
import * as Location from "expo-location";
import Logo from "../component/presenter/Logo";

const imagePath = [
    require(`../assets/images/intro/intro_1.jpeg`),
    require(`../assets/images/intro/intro_2.jpeg`),
    require(`../assets/images/intro/intro_3.jpeg`),
];

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${(props) => props.theme.backgroundColor};
`;

const Top = styled.View`
    flex: 2.5;
    padding-top: 50px;
    align-items: center;
`;

const Bottom = styled.View`
    flex: 1;
`;

const IntroImage = styled.Image`
    width: ${(props) => props.size + "px"};
    height: ${(props) => props.size + "px"};
`;

const TopButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    padding-bottom: 40px;
`;

const BottomButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 40px;
    height: 60%;
`;

const topButtonProps = {
    size: 25,
    margin: "0px 5px 0px 5px",
};

const bottomButtonProps = {
    size: 100,
    textSize: 22,
    textWeight: 400,
    textColor: "#555555",
    color: "white",
};

export default function Intro() {
    const { width: imageSize } = useWindowDimensions();
    const navigation = useNavigation();
    const flatListRef = useRef();
    const [imageIndex, setImageIndex] = useState(0);
    const [ok, setOk] = useState(true);

    const askLocationPermission = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
    };

    useEffect(() => {
        askLocationPermission();
    }, []);

    const renderIntro = ({ item: path }) => (
        <IntroImage size={imageSize} source={path} />
    );

    const scrollToIntroImage = (index) => {
        flatListRef.current.scrollToIndex({ index });
        setImageIndex(index);
    };

    const goToSignIn = () => {
        navigation.navigate("SignInNavigator");
    };
    const goToSignUp = () => {
        navigation.navigate("SignUpNavigator");
    };

    return (
        <Container>
            {
                ok ? (
                    <>
                        <Top>
                            <Logo />
                            <FlatList
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                data={imagePath}
                                renderItem={renderIntro}
                                ref={flatListRef}
                                onMomentumScrollEnd={(event) => {
                                    const index = Math.floor(
                                        Math.floor(
                                            event.nativeEvent.contentOffset.x
                                        ) /
                                            Math.floor(
                                                event.nativeEvent
                                                    .layoutMeasurement.width
                                            )
                                    );
                                    setImageIndex(index);
                                }}
                            />
                            <TopButtonWrapper>
                                {imagePath.map((__, index) => (
                                    <CircleButton
                                        key={index}
                                        onPress={() =>
                                            scrollToIntroImage(index)
                                        }
                                        color={
                                            imageIndex === index
                                                ? theme.sub.yellow
                                                : "#eeeeee"
                                        }
                                        {...topButtonProps}
                                    />
                                ))}
                            </TopButtonWrapper>
                        </Top>
                        <Bottom>
                            <BottomButtonWrapper>
                                <CircleButton
                                    onPress={goToSignIn}
                                    value="로그인"
                                    {...bottomButtonProps}
                                />
                                <VerticalDivider color="#cccccc" />
                                <CircleButton
                                    onPress={goToSignUp}
                                    value="회원가입"
                                    {...bottomButtonProps}
                                />
                            </BottomButtonWrapper>
                        </Bottom>
                    </>
                ) : null //TODO: 어플종료 추가
            }
        </Container>
    );
}
