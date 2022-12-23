import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import { TextInput } from "../../component/presenter/input/TextInput";

const Wrapper = styled.View`
    width: 100%;
`;
const Row = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const Title = styled.Text`
    font-size: 30px;
    width: 26%;
`;

const Input = styled(TextInput)`
    width: ${(props) => (props.width ? props.width : "80px")};
    margin-right: 5px;
`;

const LargeInput = styled(TextInput)`
    width: 74%;
`;

function RegistWork({ route }) {
    return (
        <DefaultLayout>
            <Wrapper>
                <Row>
                    <Title>작업일자</Title>
                    <Input />
                    <Input />
                    <Input />
                </Row>
                <Row>
                    <Title>작업시간</Title>
                    <Input />
                    <Input />
                </Row>
                <Row>
                    <Title>작업종류</Title>
                    <LargeInput />
                </Row>
                <Row>
                    <Title>작업높이</Title>
                    <LargeInput />
                </Row>
                <Row>
                    <Title>작업물량</Title>
                    <LargeInput />
                </Row>
                <Row>
                    <Title>휴대전화</Title>
                    <Input />
                    <Input />
                    <Input />
                </Row>
                <Row>
                    <Title>작업주소</Title>
                    <LargeInput />
                </Row>
                <Row>
                    <Title></Title>
                    <LargeInput />
                </Row>
            </Wrapper>
        </DefaultLayout>
    );
}

RegistWork.propTypes = {};
export default RegistWork;
