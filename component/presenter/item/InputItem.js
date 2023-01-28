import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import ItemTitle from "../title/ItemTitle";

const InputContainer = styled.View`
    width: 100%;
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
