import * as React from "react";
import {SystemIcon} from "../icon/SystemIcon";
import {NavigationBarText} from "../text/NavigationBarText";
import {IconType} from "../icon/IconType";
import {HBox} from "../box/HBox";

export const NavigationBar = (props) =>
    <HBox
        alignItems={'center'}
        flex={0}
        style={{paddingTop: 22, backgroundColor: props.color}}>
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
    </HBox>

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