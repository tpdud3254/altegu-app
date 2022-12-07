import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import Button from "../button/Button";
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
                <KeyboardAvoidingView
                    style={{ width: "100%" }}
                    behavior="position"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
                >
                    {children}
                </KeyboardAvoidingView>
                <Button {...submitBtnProps} />
            </Container>
        </DismissKeyboard>
    );
}
