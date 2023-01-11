import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ScrollView, Text, View } from "react-native";
import DefaultLayout from "../../component/presenter/layout/DefaultLayout";
import { TextInput } from "../../component/presenter/input/TextInput";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { theme } from "../../styles";
import Button from "../../component/presenter/button/Button";
import Toast from "react-native-toast-message";

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
    font-size: 20px;
    width: 28%;
`;

const Input = styled(TextInput)`
    width: ${(props) => (props.width ? props.width : "80px")};
    margin-right: 5px;
`;

const LargeInput = styled(TextInput)`
    width: 72%;
`;

const TestInput = styled(TextInput)`
    width: 100%;
`;

function RegistWork({ route }) {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [isChecked, setChecked] = useState(true);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    console.log(route?.params?.range);
    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const regist = () => {
        Toast.show({
            type: "error",
            text1: "작업이 등록 되었습니다",
        });
    };
    return (
        <DefaultLayout>
            <ScrollView>
                <Wrapper>
                    <Row>
                        <Title>작업일자</Title>
                        <Input defaultValue="2023" />
                        <Input defaultValue="01" />
                        <Input defaultValue="02" />
                    </Row>
                    <Row>
                        <Title>작업시간</Title>
                        <Input />
                        <Input />
                    </Row>
                    <Row>
                        <Title>작업종류</Title>
                        <LargeInput
                            defaultValue={
                                route?.params.type === "ladder"
                                    ? "사다리"
                                    : "스카이"
                            }
                        />
                    </Row>
                    <Row>
                        <Title>작업높이</Title>
                        <LargeInput
                            defaultValue={
                                route?.params?.range === "high"
                                    ? "고층"
                                    : route?.params?.range === "row"
                                    ? "저층"
                                    : "중층"
                            }
                        />
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
                            <Picker.Item label="작업물량1" value="작업물량1" />
                            <Picker.Item label="작업물량2" value="작업물량2" />
                            <Picker.Item label="작업물량3" value="작업물량3" />
                            <Picker.Item label="작업물량4" value="작업물량4" />
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
                            value={isChecked2}
                            onValueChange={setChecked2}
                            color={isChecked2 ? theme.main : undefined}
                        />
                        <Text>내림</Text>
                        <Checkbox
                            style={{ width: 30, height: 30 }}
                            value={isChecked3}
                            onValueChange={setChecked3}
                            color={isChecked3 ? theme.main : undefined}
                        />
                        <Text>양사</Text>
                    </Row>
                    <Row>
                        <Title>특이사항</Title>
                    </Row>
                    <Row>
                        <TestInput />
                    </Row>
                </Wrapper>
                <Button value="작업등록" fn={regist} />
            </ScrollView>
        </DefaultLayout>
    );
}

RegistWork.propTypes = {};
export default RegistWork;
