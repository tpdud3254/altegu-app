import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { theme } from "../../../styles";
import { Text } from "react-native";

export default function TabIcon({ iconName, focused, size, color, iconText }) {
    return (
        <>
            <Ionicons
                // name={focused ? iconName : `${iconName}-outline`}
                name={iconName}
                size={size ? size : 10}
                color={color ? color : focused ? theme.main : "rgba(1,1,1,0.5)"}
            />
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "600",
                    marginTop: 3,
                    color: focused ? "black" : "rgba(1,1,1,0.5)",
                }}
            >
                {iconText}
            </Text>
        </>
    );
}

TabIcon.propTypes = {
    iconName: PropTypes.string.isRequired,
    focused: PropTypes.bool,
    size: PropTypes.number,
    color: PropTypes.string,
    iconText: PropTypes.string.isRequired,
};
