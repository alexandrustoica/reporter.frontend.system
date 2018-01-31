import {IconType} from "../icon/IconType";
import {Colors} from "../color/Colors";
import {HBox} from "../box/HBox";
import React from "react";
import {Text} from "react-native";
import {SystemIcon} from "../icon/SystemIcon";

export const BarMessage = (props) =>
    <HBox alignItems={'center'}
          height={70}
          flex={0}
          style={{backgroundColor: props.color}}>
        <SystemIcon url={props.icon}/>
        <Text style={{color: props.textColor}}>
            {props.text}
        </Text>
    </HBox>


BarMessage.defaultProps = {
    icon: IconType.PROFILE_LIGHT,
    textColor: Colors.WHITE,
    color: Colors.BLUE,
    height: 70,
    text: "You're offline!",
}