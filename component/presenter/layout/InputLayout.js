import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const InputContainer = styled.View`
    width: 100%;
    margin-bottom: 20px;
    padding: 0px 5px;
`;

const InputText = styled.Text`
    width: 100%;
    padding-left: 5px;
    padding-bottom: 5px;
    font-size: 18px;
    color: ${(props) => props.theme.darkFontColor};
    font-weight: 500;
`;

function InputLayout({ title, children }) {
    return (
        <InputContainer>
            <InputText>{title}</InputText>
            {children}
        </InputContainer>
    );
}

InputLayout.propTypes = {
    title: PropTypes.string,
};

export default InputLayout;
