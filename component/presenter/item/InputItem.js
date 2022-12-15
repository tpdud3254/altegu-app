import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import ItemTitle from "../text/ItemTitle";

const InputContainer = styled.View`
    width: 100%;
    margin-bottom: 20px;
    padding: 0px 5px;
`;

function InputItem({ title, children }) {
    return (
        <InputContainer>
            <ItemTitle title={title} />
            {children}
        </InputContainer>
    );
}

InputItem.propTypes = {
    title: PropTypes.string,
};

export default InputItem;
