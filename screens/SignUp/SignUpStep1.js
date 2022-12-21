import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLayout from "../../component/presenter/layout/FormLayout";
import Title from "../../component/presenter/text/Title";
import InputItem from "../../component/presenter/item/InputItem";
import { TextInput } from "../../component/presenter/input/TextInput";
import InputBtnItem from "../../component/presenter/item/InputBtnItem";
import { Input } from "../../component/presenter/input/Input";
import Item from "../../component/presenter/item/Item";
import Button from "../../component/presenter/button/Button";
import { ORDINARY } from "../../constant";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles";

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

    console.log("member type : ", route?.params?.memberType);

    console.log(route?.params?.file);
    const onClick = () => {
        setTextSecure((prev) => !prev);
    };

    const onNextStep = () => {
        navigation.navigate("SignUpStep2", {
            memberType: route?.params?.memberType, //TODO: Redux 적용
        });
    };

    const takePicture = () => {
        navigation.navigate("TakePhoto", {
            memberType: route?.params?.memberType, //TODO: Redux 적용
        });
    };

    return (
        <FormLayout submitBtnProps={{ value: "다음으로", fn: onNextStep }}>
            <Title value="회원가입" color="#555555" />
            <ScrollView style={{ marginBottom: 55 }}>
                <InputItem
                    title={
                        route?.params?.memberType === ORDINARY
                            ? "이름"
                            : "이름 / 상호명"
                    }
                >
                    <TextInput
                        placeholder={
                            route?.params?.memberType === ORDINARY
                                ? "이름"
                                : "이름 / 상호명"
                        }
                        returnKeyType="next"
                    />
                </InputItem>
                <InputBtnItem
                    title="비밀번호 등록"
                    btnTitle="보기"
                    fn={onClick}
                >
                    <Input
                        placeholder="비밀번호"
                        secureTextEntry={textSecure}
                        returnKeyType="done"
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
                                placeholder="숫자만 적어주세요"
                                keyboardType="number-pad"
                                returnKeyType="next"
                            />
                        </InputItem>
                        <Item title="추천 기사님 정보">
                            <RowContainer>
                                <TextInput
                                    placeholder="성함 / 상호명"
                                    returnKeyType="next"
                                    width="39%"
                                />
                                <TextInput
                                    placeholder="휴대폰 번호"
                                    returnKeyType="next"
                                    width="59%"
                                />
                            </RowContainer>

                            {true ? null : (
                                <TextContainer>
                                    <RecommenderText>홍길동</RecommenderText>
                                    <RecommenderText>
                                        010-1234-5678
                                    </RecommenderText>
                                    <Ionicons
                                        name="checkmark"
                                        color={theme.sub.green}
                                        size={30}
                                    />
                                </TextContainer>
                            )}

                            {true ? null : (
                                <TextContainer>
                                    <RecommenderText style={{ color: "red" }}>
                                        올바른 번호 혹은 성함을 입력해 주세요.
                                    </RecommenderText>
                                </TextContainer>
                            )}
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
