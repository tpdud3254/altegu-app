import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import { TextInput } from "../../component/presenter/input/TextInput";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { theme } from "../../styles";

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
    width: 28%;
`;

const Input = styled(TextInput)`
    width: ${(props) => (props.width ? props.width : "80px")};
    margin-right: 5px;
`;

const LargeInput = styled(TextInput)`
    width: 72%;
`;

function RegistWork({ route }) {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [isChecked, setChecked] = useState(false);

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

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
                    <Picker
                        ref={pickerRef}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }
                        style={{ width: "74%" }}
                    >
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
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
                <Row>
                    <Title>올림/내림</Title>
                    <Checkbox
                        style={{ width: 30, height: 30 }}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? theme.main : undefined}
                    />
                    <Text>올림</Text>
                    <Checkbox
                        style={{ width: 30, height: 30 }}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? theme.main : undefined}
                    />
                    <Text>내림</Text>
                    <Checkbox
                        style={{ width: 30, height: 30 }}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? theme.main : undefined}
                    />
                    <Text>양사</Text>
                </Row>
            </Wrapper>
        </DefaultLayout>
    );
}

RegistWork.propTypes = {};
export default RegistWork;
