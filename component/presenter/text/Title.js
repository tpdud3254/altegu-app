import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
    margin-bottom: 20px;
`;
const Text = styled.Text`
    color: ${(props) => props.color || props.theme.sub.green};
    font-size: ${(props) => props.size || 40}px;
    font-weight: 600;
`;
function Title({ value, color, size }) {
    return (
        <Container>
            <Text color={color} size={size}>
                {value}
            </Text>
        </Container>
    );
}

Title.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
};
export default Title;
