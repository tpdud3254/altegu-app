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
    padding-bottom: 7px;
    font-size: 30px;
    color: ${(props) => props.theme.darkFontColor};
    font-weight: 500;
`;

const Wrapper = styled.View`
    border: 2px solid ${(props) => props.theme.sub.blue};
    width: 100%;
    padding: 10px 10px;
    border-radius: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text`
    font-size: 18px;
    color: ${(props) => props.theme.darkFontColor};
`;

function InputBtnItem({ title, btnTitle, fn, children }) {
    return (
        <InputContainer>
            <InputText>{title}</InputText>
            <Wrapper>
                {children}
                <Button onPress={fn}>
                    <ButtonText>{btnTitle}</ButtonText>
                </Button>
            </Wrapper>
        </InputContainer>
    );
}

InputBtnItem.propTypes = {
    title: PropTypes.string,
    btnTitle: PropTypes.string,
    fn: PropTypes.func,
};

export default InputBtnItem;
