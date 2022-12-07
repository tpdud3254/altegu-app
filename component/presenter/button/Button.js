import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const SButton = styled.TouchableOpacity`
    background-color: ${(props) => props.color || props.theme.sub.green};
    padding: 18px 10px;
    border-radius: 5px;
    align-items: center;
    margin: 10px 0px;
    width: 100%;
`;

const ButtonText = styled.Text`
    font-size: ${(props) => props.textSize || 20}px;
    color: ${(props) => props.textColor || props.theme.lightFontColor};
    font-weight: 500;
`;

function Button({ title, color, textSize, textColor, fn }) {
    return (
        <SButton
            color={color}
            textSize={textSize}
            textColor={textColor}
            onPress={fn}
        >
            <ButtonText>{title}</ButtonText>
        </SButton>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    textSize: PropTypes.number,
    textColor: PropTypes.string,
    fn: PropTypes.func.isRequired,
};
export default Button;
