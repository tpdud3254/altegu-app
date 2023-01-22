import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { fonts } from "../../../styles";

function ContentBoldText(props) {
    return (
        <Text
            {...props}
            style={{ ...props.style, fontFamily: fonts.contentBold }}
        >
            {props.children}
        </Text>
    );
}

ContentBoldText.propTypes = {};
export default ContentBoldText;
