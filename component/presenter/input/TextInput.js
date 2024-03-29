import styled from "styled-components/native";
import { fonts, theme } from "../../../styles";

export const TextInput = styled.TextInput`
    /* border: 2px solid ${(props) => props.theme.sub.yellow + "aa"}; */
    border: 1px solid ${theme.textBoxColor};
    width: ${(props) => (props.width ? props.width : "100%")};
    font-size: 20px;
    padding: 10px;
`;
