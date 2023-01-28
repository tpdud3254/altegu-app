import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts, theme } from "../../../styles";

const SButton = styled.TouchableOpacity`
    background-color: ${(props) => props.color || theme.btnPointColor};
    /* padding: 18px 10px; */
    border-radius: 5px;
    align-items: center;
    /* margin: 10px 0px 10px 0px; */
    width: 100%;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ButtonText = styled.Text`
    font-size: ${(props) => props.textSize || 20}px;
    color: ${(props) => props.textColor || props.theme.lightFontColor};
    font-family: ${fonts.content};
`;

function SubmitButton({
    value,
    color,
    textSize,
    textColor,
    onPress,
    disabled,
}) {
    return (
        <SButton
            color={color}
            textSize={textSize}
            textColor={textColor}
            disabled={disabled}
            onPress={onPress}
        >
            <ButtonText>{value}</ButtonText>
        </SButton>
    );
}

SubmitButton.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
    textSize: PropTypes.number,
    textColor: PropTypes.string,
    fn: PropTypes.func,
};
export default SubmitButton;
