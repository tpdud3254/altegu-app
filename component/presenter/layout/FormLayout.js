import React from "react";
import { Platform, KeyboardAvoidingView, View, Text } from "react-native";
import styled from "styled-components/native";
import SubmitButton from "../button/SubmitButton";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
    flex: 1;
    /* align-items: center; */
    justify-content: space-between;
    background-color: ${(props) => props.theme.backgroundColor};
    padding: 0px 10px 10px 10px;
`;

export default function FormLayout({ children, submitBtnProps }) {
    return (
        <DismissKeyboard>
            <Container>
                <View style={{ flex: 9 }}>{children}</View>

                <SubmitButton
                    style={{ flex: 1 }}
                    {...submitBtnProps}
                    // style={{ marginBottom: 50 }}
                />
            </Container>
        </DismissKeyboard>
    );
}
