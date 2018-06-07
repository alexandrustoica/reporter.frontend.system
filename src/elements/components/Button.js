import {Text, TouchableOpacity} from "react-native";
import {CenterBox} from "../box/CenterBox";
import * as React from "react";
import {Colors} from "../color/Colors";
import {Icon} from "react-native-elements";

export const Button = (props) =>
    <TouchableOpacity
        onPress={props.onPress}
        style={{
            backgroundColor: props.backgroundColor,
            height: props.height,
            width: props.width,
            flex: props.flex,
        }}>
        <CenterBox>
            <Icon name={props.icon.name} color={props.icon.color}/>
            <Text style={{
                color: props.textColor,
                fontSize: props.textSize,
                textAlign: 'center',
                alignSelf: 'center'
            }}>
                {props.text}
            </Text>
        </CenterBox>
    </TouchableOpacity>

Button.defaultProps = {
    onPress: null,
    backgroundColor: Colors.BLACK,
    flex: 1,
    width: null,
    icon: {name: 'add', color: 'transparent'},
    height: 70,
    textColor: Colors.WHITE,
    text: 'Button',
    textSize: 16,
}