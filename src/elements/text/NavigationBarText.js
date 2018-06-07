import * as React from "react";
import {Text} from "react-native";
import {Colors} from "../color/Colors";

export const NavigationBarText = (props) =>
    <Text style={{
        fontSize: props.fontSize,
        flex: props.flex,
        textAlign: props.align,
        paddingLeft: 20,
        color: props.color}}>{props.children}</Text>

NavigationBarText.defaultProps = {
    align: 'center',
    color: Colors.BLACK,
    fontSize: 20,
    flex: 1,
}