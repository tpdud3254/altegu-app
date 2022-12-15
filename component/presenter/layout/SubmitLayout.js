import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
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

export default function SubmitLayout({ children, submitBtnProps }) {
    return (
        <Container>
            {children}
            <SubmitButton {...submitBtnProps} />
        </Container>
    );
}
