import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.backgroundColor};
    padding: 20px 10px;
`;

export default function DefaultLayout({ children }) {
    return <Container>{children}</Container>;
}
