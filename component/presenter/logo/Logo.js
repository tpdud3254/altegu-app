import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Image, Text, View } from "react-native";

const Background = styled.View`
    background-color: #333333;
    width: 50%;
    padding: 10px 25px;
    border-radius: 80px;
`;

const LogoImage = styled.Image`
    width: 100%;
    height: 60px;
`;
function Logo() {
    return (
        <Background>
            <LogoImage
                style={{
                    resizeMode: "contain",
                }}
                source={require(`../../../assets/images/logo/text-logo.png`)}
            />
        </Background>
    );
}

Logo.propTypes = {};
export default Logo;
