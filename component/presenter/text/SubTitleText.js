import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { fonts } from "../../../styles";

function SubTitleText(props) {
    return (
        <Text {...props} style={{ ...props.style, fontFamily: fonts.subTitle }}>
            {props.children}
        </Text>
    );
}

SubTitleText.propTypes = {};
export default SubTitleText;
