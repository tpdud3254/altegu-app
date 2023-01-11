import React from "react";
import { Platform, KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import SubmitButton from "../button/SubmitButton";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme.backgroundColor};
    padding: 20px 10px;
`;

export default function FormLayout({ children, submitBtnProps }) {
    return (
        <DismissKeyboard>
            <Container>
                <View
                    style={{ width: "100%", flex: 5 }}
                    // behavior="padding"
                    // keyboardVerticalOffset={80}
                >
                    {children}
                </View>
                <SubmitButton
                    {...submitBtnProps}
                    // style={{ marginBottom: 50 }}
                />
            </Container>
        </DismissKeyboard>
    );
}
