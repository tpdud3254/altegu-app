import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { fonts, theme } from "../../../styles";
import ItemTitle from "../title/ItemTitle";

const InputContainer = styled.View`
    width: 100%;
`;

const Wrapper = styled.View`
    /* border: 2px solid ${(props) => props.theme.sub.yellow + "aa"}; */
    border: 1px solid ${theme.textBoxColor};
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text`
    font-size: 18px;
    color: ${theme.darkFontColor};
`;

//inputbox내에 button (ex. password)
function InputBtnItem({ title, btnTitle, fn, children }) {
    return (
        <InputContainer>
            <ItemTitle title={title} />
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
