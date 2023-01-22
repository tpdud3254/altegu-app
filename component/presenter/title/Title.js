import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts, theme } from "../../../styles";
import TitleText from "../text/TitleText";

const Container = styled.View``;
const Text = styled.Text`
    color: ${(props) => props.color || props.theme.sub.green};
    font-size: ${(props) => props.size || 35}px;
`;
function Title({ value, color, size }) {
    return (
        <Container>
            <TitleText style={{ color: color, fontSize: size || 35 }}>
                {value}
            </TitleText>
        </Container>
    );
}

Title.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
};
export default Title;
