import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts } from "../../../styles";
import SubTitleText from "../text/SubTitleText";

const Container = styled.View`
    margin-top: 3px;
`;

function SubTitle({ value, color, size }) {
    return (
        <Container>
            <SubTitleText
                style={{ color: color || "#777777", fontSize: size || 23 }}
            >
                {value}
            </SubTitleText>
        </Container>
    );
}

SubTitle.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
};
export default SubTitle;
