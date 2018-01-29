import FlexBuilder from "../component/styles/FlexBuilder";
import * as React from "react";
import {View} from "react-native";
import {SystemIcon} from "../icon/SystemIcon";
import {NavigationBarText} from "./text/NavigationBarText";
import {IconType} from "../icon/Icon";

export const NavigationBar = (props) =>
    <View style={[{paddingTop: 22, backgroundColor: props.color},
        new FlexBuilder().withItemAlignment("center").withRowFlex().build()]}>
        <SystemIcon
            url={props.leftIcon}
            onPress={props.leftAction}/>
        <NavigationBarText
            color={props.textColor}
            align={props.align}>
            {props.text}
        </NavigationBarText>
        <SystemIcon
            url={props.rightIcon}
            onPress={props.rightAction}/>
    </View>

NavigationBar.defaultProps = {
    leftIcon: IconType.EMPTY,
    leftAction: () => console.log("Left Button Pressed"),
    rightIcon: IconType.EMPTY,
    rightAction: () => console.log("Right Button Pressed"),
    color: 'transparent',
    text: 'Text',
    textColor: 'black',
    textAlign: 'left'
}