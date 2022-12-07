import styled from "styled-components/native";

export const TextInput = styled.TextInput`
    border: 2px solid ${(props) => props.theme.sub.blue};
    width: 100%;
    font-size: 20px;
    padding: 10px 10px;
    border-radius: 10px;
`;
