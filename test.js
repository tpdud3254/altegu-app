import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import DefaultLayout from "./component/presenter/layout/DefaultLayout";

function Intro() {
    return (
        <DefaultLayout>
            <Text>Intro</Text>
        </DefaultLayout>
    );
}

Intro.propTypes = {};
export default Intro;
