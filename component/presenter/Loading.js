import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ActivityIndicator, Text, View } from "react-native";
import DefaultLayout from "./layout/DefaultLayout";
import { theme } from "../../styles";

const LoadingContainer = styled.View`
    background-color: #ffffffcc;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    justify-content: center;
`;

function Loading() {
    return (
        <LoadingContainer>
            <ActivityIndicator size="large" color={theme.sub.yellow} />
        </LoadingContainer>
    );
}

Loading.propTypes = {};
export default Loading;
