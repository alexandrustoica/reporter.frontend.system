import {SystemIcon} from "../icon/SystemIcon";
import * as React from "react";
import {Circle} from "../icon/Circle";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/IconType";
import {View} from "react-native";

export const ActionButton = (props) =>
    <Circle radius={props.radius} color={props.color}
            style={{
                shadowColor: Colors.BLUE,
                shadowOffset: {
                    width: 0,
                    height: 10
                },
                shadowRadius: 30,
                shadowOpacity: 0.5,
            }}>
        <SystemIcon url={props.icon} onPress={props.onPress}/>
    </Circle>

ActionButton.defaultProps = {
    color: Colors.BLUE,
    radius: 30,
    onPress: null,
    icon: IconType.PLUS_LIGHT
}

