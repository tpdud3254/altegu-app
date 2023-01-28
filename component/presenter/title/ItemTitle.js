import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts } from "../../../styles";
import ContentBoldText from "../text/ContentBoldText";
import ContentText from "../text/ContentText";
import SubTitleText from "../text/SubTitleText";

function ItemTitle({ title, size, color }) {
    return (
        <SubTitleText
            style={{
                fontSize: size || 22,
                color: color,
                marginTop: 20,
                marginBottom: 7,
            }}
        >
            {title}
        </SubTitleText>
    );
}

ItemTitle.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
};
export default ItemTitle;
