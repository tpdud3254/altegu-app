import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import DefaultLayout from "../component/presenter/layout/DefaultLayout";

function Home() {
    return (
        <DefaultLayout>
            <Text>Home</Text>
        </DefaultLayout>
    );
}

Home.propTypes = {};
export default Home;
