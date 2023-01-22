import styled from "styled-components/native";
import { fonts, theme } from "../../../styles";

export const TextInput = styled.TextInput`
    /* border: 2px solid ${(props) => props.theme.sub.yellow + "aa"}; */
    border: 2px solid ${theme.textBoxColor};
    width: ${(props) => (props.width ? props.width : "100%")};
    font-size: 20px;
    height: 60px;
    font-family: ${fonts.content};
    padding-left: 10px;
`;
