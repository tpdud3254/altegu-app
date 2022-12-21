import React, { useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import DefaultLayout from "../component/presenter/layout/DefaultLayout";

function DetailTerms({ route, navigation }) {
    useEffect(() => {
        navigation.setOptions({ title: route?.params?.title });
    }, []);

    return (
        <DefaultLayout>
            <Text>상세약관 {route?.params?.index}</Text>
        </DefaultLayout>
    );
}

DetailTerms.propTypes = {};
export default DetailTerms;
