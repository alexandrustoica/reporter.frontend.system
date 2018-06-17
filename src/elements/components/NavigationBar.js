import * as React from "react";
import {NavigationBarText} from "../text/NavigationBarText";
import {HBox} from "../box/HBox";
import {Icon} from "react-native-elements";

export const NavigationBar = (props) =>
    <HBox
        alignItems={'center'}
        flex={0}
        style={{paddingTop: 22, backgroundColor: props.color}}>
        <HBox style={{padding: 20}}>
            <Icon containerStyle={{width: 30, height: 30}}
                onPress={props.leftAction}
                name={props.leftIcon.name}
                color={props.leftIcon.color}/>
            <NavigationBarText
                color={props.textColor}
                align={props.align}>
                {props.text}
            </NavigationBarText>
            <Icon containerStyle={{width: 30, height: 30}}
                onPress={props.rightAction}
                name={props.rightIcon.name}
                color={props.rightIcon.color}/>
        </HBox>
    </HBox>

NavigationBar.defaultProps = {
    leftIcon: {name: 'vpn-key', color: 'transparent'},
    leftAction: () => console.log("Left Button Pressed"),
    rightIcon: {name: 'vpn-key', color: 'transparent'},
    rightAction: () => console.log("Right Button Pressed"),
    color: 'transparent',
    text: 'Text',
    textColor: 'black',
    textAlign: 'left'
}