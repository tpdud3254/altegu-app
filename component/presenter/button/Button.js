import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const SButton = styled.TouchableOpacity`
    background-color: ${(props) => props.color || "#888888"};
    padding: 10px 10px;
    border-radius: 5px;
    align-items: center;
    margin: 5px 0px;
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "50px")};
    justify-content: center;
`;

const ButtonText = styled.Text`
    font-size: ${(props) => props.textSize || 18}px;
    color: ${(props) => props.textColor || props.theme.lightFontColor};
    font-weight: 500;
`;

function Button({ value, color, textSize, textColor, fn, width, height }) {
    return (
        <SButton color={color} width={width} height={height} onPress={fn}>
            <ButtonText textSize={textSize} textColor={textColor}>
                {value}
            </ButtonText>
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
