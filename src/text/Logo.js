import {Text} from "react-native";
import * as React from "react";
import {Colors} from "../color/Colors";

export const Logo = (props) =>
    <Text style={{backgroundColor: props.backgroundColor, fontSize: props.size}}>
        <Text style={{color: props.primaryColor}}>
            {props.primaryText}
        </Text>
        <Text style={{color: props.secondaryColor}}>
            {props.secondaryText}
        </Text>
    </Text>

Logo.defaultProps = {
    size: 35,
    primaryColor: Colors.WHITE,
    secondaryColor: Colors.BLUE,
    primaryText: 'item',
    secondaryText: 'er',
    backgroundColor: Colors.TRANSPARENT
}
