import {IconType} from "../icon/IconType";
import {Colors} from "../color/Colors";
import {Text, TouchableOpacity} from "react-native";
import {Box} from "../box/Box";
import React from "react";
import {SystemIcon} from "../icon/SystemIcon";

export const ExceptionMessage = (props) =>
    <TouchableOpacity
        style={{flex: 20}}
        onPress={props.onPress}>
        <Box alignItems={'center'}
             justifyContent={'center'}
             onPress={props.onPress}
             style={{backgroundColor: props.color}}>
            <SystemIcon url={props.icon} onPress={props.onPress}/>
            <Text
                style={{color: props.textColor, fontSize: props.errorFontSize}}>
                {props.errorMessage}
            </Text>
            <Text
                style={{color: props.textColor, fontSize: props.retryFontSize}}>
                {props.retry}
            </Text>
        </Box>
    </TouchableOpacity>


ExceptionMessage.defaultProps = {
    onPress: () => console.log("Retry"),
    errorMessage: 'Unable to reach server',
    icon: IconType.PROFILE_DARK,
    textColor: Colors.BLACK,
    color: Colors.WHITE,
    height: 70,
    retry: 'Press here to retry!',
    text: "You're offline!",
    errorFontSize: 24,
    retryFontSize: 18,
}