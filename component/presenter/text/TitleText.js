import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { fonts } from "../../../styles";

function TitleText(props) {
    return (
        <Text {...props} style={{ ...props.style, fontFamily: fonts.title }}>
            {props.children}
        </Text>
    );
}

TitleText.propTypes = {};
export default TitleText;
