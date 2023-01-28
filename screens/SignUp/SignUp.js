import React, { useContext } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";

import { fonts, theme } from "../../styles";
import { ORDINARY, SPECIAL } from "../../constant";
import SignUpContext from "../../Context/SIgnUpContext";

const Container = styled.View`
    justify-content: space-evenly;
    flex: 1;
`;
const Wrapper = styled.View``;
const Button = styled.TouchableOpacity`
    background-color: ${theme.btnPointColor};
    align-items: center;
    padding: 20px;
    border-radius: 5px;
`;
const ButtonText = styled.Text`
    color: ${theme.lightFontColor};
    font-family: ${fonts.subTitle};
    font-size: 30px;
`;
const Content = styled.View``;
const ContentText = styled.Text`
    font-family: ${fonts.content};
    font-size: 20px;
`;

function SignUp() {
    const navigation = useNavigation();
    const { setInfo } = useContext(SignUpContext);

    const onPress = (data) => {
        setInfo({ userType: data });
        navigation.navigate("SignUpStep1");
    };
    return (
        <DefaultLayout>
            <Container>
                <Wrapper>
                    <Button onPress={() => onPress(ORDINARY)}>
                        <ButtonText>일반회원 가입</ButtonText>
                    </Button>
                    <Content>
                        <ContentText>
                            일반회원은 작업 등록만 가능하며 등록된 작업을 예약할
                            수 없습니다. 일반회원 가입 후 언제든지 자유롭게
                            기사/기업회원 전환이 가능합니다.
                        </ContentText>
                    </Content>
                </Wrapper>
                <Wrapper>
                    <Button onPress={() => onPress(SPECIAL)}>
                        <ButtonText>기사/기업 가입</ButtonText>
                    </Button>
                    <Content>
                        <ContentText>
                            기사/기업회원은 작업 등록 분만 아니라 등록된 작업을
                            예약하여 진행하실 수 있습니다. 제휴 기업의 경우
                            별도의 작업 등록 시스템이 제공됩니다.
                        </ContentText>
                    </Content>
                </Wrapper>
            </Container>
        </DefaultLayout>
    );
}

SignUp.propTypes = {};
export default SignUp;
