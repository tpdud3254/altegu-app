import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts } from "../../../styles";

const Button = styled.TouchableOpacity`
    background-color: ${(props) => props.color || props.theme.main};
    width: ${(props) => props.size || 10}px;
    height: ${(props) => props.size || 10}px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    margin: ${(props) => props.margin || 0};
`;

const ButtonText = styled.Text`
    color: ${(props) => props.textColor || props.theme.lightFontColor};
    font-weight: ${(props) => props.textWeight || 500};
    font-size: ${(props) => props.textSize || 16}px;
    font-family: ${fonts.subTitle};
`;

function CircleButton({
    onPress,
    value,
    size,
    textSize,
    textWeight,
    color,
    textColor,
    margin,
}) {
    return (
        <Button onPress={onPress} size={size} color={color} margin={margin}>
            <ButtonText
                textSize={textSize}
                textWeight={textWeight}
                textColor={textColor}
            >
                {value}
            </ButtonText>
        </Button>
    );
}

CircleButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    value: PropTypes.string,
    size: PropTypes.number,
    textSize: PropTypes.number,
    textWeight: PropTypes.number,
    color: PropTypes.string,
    textColor: PropTypes.string,
    margin: PropTypes.string,
};

export default CircleButton;
