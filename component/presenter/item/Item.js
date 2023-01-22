import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import ItemTitle from "../title/ItemTitle";

const SItem = styled.View`
    width: 100%;
    margin-bottom: 20px;
    padding: 0px 5px;
`;

function Item({ title, children }) {
    return (
        <SItem>
            <ItemTitle title={title} />
            {children}
        </SItem>
    );
}

Item.propTypes = {
    title: PropTypes.string,
};

export default Item;
