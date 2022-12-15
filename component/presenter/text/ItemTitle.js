import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Text = styled.Text`
    width: 100%;
    padding-left: 5px;
    padding-bottom: 5px;
    font-size: 30px;
    color: ${(props) => props.theme.darkFontColor};
    font-weight: 500;
`;

function ItemTitle({ title }) {
    return <Text>{title}</Text>;
}

ItemTitle.propTypes = {
    title: PropTypes.string.isRequired,
};
export default ItemTitle;
