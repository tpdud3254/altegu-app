import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitLayout from "../../component/presenter/layout/SubmitLayout";
import Title from "../../component/presenter/text/Title";
import Checkbox from "expo-checkbox";
import { theme } from "../../styles";

const termsTexts = [
    "만 14세 이상입니다. (필수)",
    "서비스 이용약관 (필수)",
    "개인정보 수집 및 이용 동의 (필수)",
    "위치 서비스 이용 동의 (필수)",
    "이벤트 및 할인 혜택 안내 동의",
];

const Container = styled.View``;

const Wrapper = styled.View`
    padding: 0px 25px 0px 25px;
`;

const Terms = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 35px;
    align-items: center;
`;
const TermsText = styled.Text`
    font-size: ${(props) => (props.bold ? 27 : 25)}px;
    color: ${(props) => (props.bold ? "black" : props.theme.darkFontColor)};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
`;

function SignUpStep4({ route }) {
    const [checkArr, setCheckArr] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);
    const [isAllChecked, setAllChecked] = useState(false);
    const [blockAllChecked, setBlockAllChecked] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if (isAllChecked) {
            const newCheckArr = [true, true, true, true, true];

            setCheckArr(newCheckArr);
            setBlockAllChecked(false);
        } else {
            if (!blockAllChecked) {
                const newCheckArr = [false, false, false, false, false];

                setCheckArr(newCheckArr);
            } else {
                setBlockAllChecked(false);
            }
        }
    }, [isAllChecked]);

    const clickCheckButton = (value, index) => {
        const newCheckArr = [...checkArr];

        newCheckArr[index] = value;

        setCheckArr(newCheckArr);

        const uncheckedArr = newCheckArr.filter((value) => value === false);

        if (uncheckedArr.length < 1) {
            setAllChecked(true);
        } else {
            setBlockAllChecked(true);
            setAllChecked(false);
        }
    };

    const onNextStep = () => {
        navigation.navigate("SignUpStep5", {
            memberType: route?.params?.memberType,
        });
    };
    return (
        <SubmitLayout submitBtnProps={{ value: "동의하기", fn: onNextStep }}>
            <Container>
                <Title value="약관동의" color="#555555" />
                <Wrapper>
                    <Terms>
                        <TermsText bold>전체 동의합니다.</TermsText>
                        <Checkbox
                            style={{ width: 40, height: 40 }}
                            value={isAllChecked}
                            onValueChange={setAllChecked}
                            color={isAllChecked ? theme.main : undefined}
                        />
                    </Terms>
                    {termsTexts.map((text, index) => (
                        <Terms key={index}>
                            <TermsText>{text}</TermsText>
                            <Checkbox
                                style={{ width: 30, height: 30 }}
                                value={checkArr[index]}
                                onValueChange={(value) => {
                                    clickCheckButton(value, index);
                                }}
                                color={checkArr[index] ? theme.main : undefined}
                            />
                        </Terms>
                    ))}
                </Wrapper>
            </Container>
        </SubmitLayout>
    );
}

SignUpStep4.propTypes = {};
export default SignUpStep4;
