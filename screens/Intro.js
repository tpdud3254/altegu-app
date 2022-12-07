import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Image,
    ScrollView,
    FlatList,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import styled from "styled-components/native";
import CircleButton from "../component/presenter/button/CircleButton";
import { theme } from "../styles";

const imagePath = [
    require(`../assets/images/intro/intro_1.jpeg`),
    require(`../assets/images/intro/intro_2.jpeg`),
    require(`../assets/images/intro/intro_3.jpeg`),
];

const Container = styled.View`
    flex: 1;
    width: 100%;
`;

const Top = styled.View`
    flex: 2;
    padding-top: 50px;
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
    justify-content: space-evenly;
    padding-bottom: 40px;
`;

const BottomButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 40px;
`;

const topButtonProps = {
    size: 60,
    textSize: 20,
};

const bottomButtonProps = {
    size: 100,
    textSize: 25,
    textWeight: 600,
    color: theme.sub.green,
};

export default function Intro() {
    const { width: imageSize } = useWindowDimensions();
    const navigation = useNavigation();
    const flatListRef = useRef();

    const renderIntro = ({ item: path }) => (
        <IntroImage size={imageSize} source={path} />
    );

    const scrollToIntroImage = (index) => {
        flatListRef.current.scrollToIndex({ index });
    };

    const goToSignIn = () => {
        navigation.navigate("SignIn");
    };
    const goToSignUp = () => {
        navigation.navigate("SignUpNavigator");
    };

    return (
        <Container>
            <Top>
                <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={imagePath}
                    renderItem={renderIntro}
                    ref={flatListRef}
                />
                <TopButtonWrapper>
                    {imagePath.map((__, index) => (
                        <CircleButton
                            key={index}
                            onPress={() => scrollToIntroImage(index)}
                            title={index + 1 + ""}
                            {...topButtonProps}
                        />
                    ))}
                </TopButtonWrapper>
            </Top>
            <Bottom>
                <BottomButtonWrapper>
                    <CircleButton
                        onPress={goToSignIn}
                        title="로그인"
                        {...bottomButtonProps}
                    />
                    <CircleButton
                        onPress={goToSignUp}
                        title="회원가입"
                        {...bottomButtonProps}
                    />
                </BottomButtonWrapper>
            </Bottom>
        </Container>
    );
}
