import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts, theme } from "../../../styles";
import TitleText from "../text/TitleText";

const Container = styled.View``;

function Title({ value, color, size }) {
    return (
        <Container>
            <TitleText
                style={{ color: color || "#555555", fontSize: size || 35 }}
            >
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
