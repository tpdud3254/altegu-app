import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const SButton = styled.TouchableOpacity`
    background-color: ${(props) => props.color || "#888888"};
    padding: 15px 10px;
    border-radius: 5px;
    align-items: center;
    margin: 5px 0px;
    width: ${(props) => (props.width ? props.width + "px" : "100%")};
    height: ${(props) => (props.height ? props.height + "px" : "50px")};
`;

const ButtonText = styled.Text`
    font-size: ${(props) => props.textSize || 18}px;
    color: ${(props) => props.textColor || props.theme.lightFontColor};
    font-weight: 500;
`;

function Button({ value, color, textSize, textColor, fn, width, height }) {
    return (
        <SButton
            color={color}
            textSize={textSize}
            textColor={textColor}
            width={width}
            height={height}
            onPress={fn}
        >
            <ButtonText>{value}</ButtonText>
        </SButton>
    );
}

Button.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
    textSize: PropTypes.number,
    textColor: PropTypes.string,
    fn: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
};
export default Button;
