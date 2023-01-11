import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import { theme } from "../../styles";
import HorizontalDivider from "../../component/presenter/divider/HorizontalDivider";

const Container = styled.View`
    flex: 1;
    justify-content: center;
`;
const Warrper = styled.View`
    margin-top: 15px;
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: center;
`;
const Button = styled.TouchableOpacity`
    align-items: center;
    background-color: ${(props) => props.color};
    padding: 15px 25px;
    border-radius: 20px;
    margin: 5px 5px;
`;
const MainText = styled.Text`
    color: white;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 5px;
`;
const SubText = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: 500;
`;

function SelectWorkTheme({ navigation }) {
    const selectTheme = (type, range) => {
        navigation.navigate("RegistWork", { type, range });
    };
    return (
        <DefaultLayout>
            <Container>
                <Warrper>
                    <Row>
                        <Button
                            color={theme.sub.yellow}
                            onPress={() => {
                                selectTheme("ladder", "row");
                            }}
                        >
                            <MainText>사다리</MainText>
                            <SubText>저층 (1-5층)</SubText>
                        </Button>
                        <Button
                            color={theme.sub.yellow}
                            onPress={() => {
                                selectTheme("ladder", "middle");
                            }}
                        >
                            <MainText>사다리</MainText>
                            <SubText>중층 (6-12층)</SubText>
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            color={theme.sub.yellow}
                            onPress={() => {
                                selectTheme("ladder", "high");
                            }}
                        >
                            <MainText>사다리</MainText>
                            <SubText>고층 (12층 이상)</SubText>
                        </Button>
                    </Row>
                </Warrper>
                <Warrper>
                    <Row>
                        <Button
                            color={theme.sub.green}
                            onPress={() => {
                                selectTheme("sky", "row");
                            }}
                        >
                            <MainText>스카이</MainText>
                            <SubText>저층 (1-5층)</SubText>
                        </Button>

                        <Button
                            color={theme.sub.green}
                            onPress={() => {
                                selectTheme("sky", "middle");
                            }}
                        >
                            <MainText>스카이</MainText>
                            <SubText>중층 (6-12층)</SubText>
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            color={theme.sub.green}
                            onPress={() => {
                                selectTheme("sky", "high");
                            }}
                        >
                            <MainText>스카이</MainText>
                            <SubText>고층 (12층 이상)</SubText>
                        </Button>
                    </Row>
                </Warrper>
            </Container>
        </DefaultLayout>
    );
}

SelectWorkTheme.propTypes = {};
export default SelectWorkTheme;
