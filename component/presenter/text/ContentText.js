import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { fonts } from "../../../styles";

function ContentText(props) {
    return (
        <Text {...props} style={{ ...props.style, fontFamily: fonts.content }}>
            {props.children}
        </Text>
    );
}

ContentText.propTypes = {};
export default ContentText;
