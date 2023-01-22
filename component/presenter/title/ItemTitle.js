import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts } from "../../../styles";
import ContentBoldText from "../text/ContentBoldText";

function ItemTitle({ title, size, color }) {
    return (
        <ContentBoldText
            style={{ fontSize: size || 23, color: color, marginBottom: -15 }}
        >
            {title}
        </ContentBoldText>
    );
}

ItemTitle.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
};
export default ItemTitle;
