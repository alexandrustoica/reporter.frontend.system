import {HBox} from "../box/HBox";
import * as React from "react";
import {TextInput} from "react-native";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/IconType";
import {Icon} from "react-native-elements";

export const EditText = (props) =>
    <HBox height={props.height}
          alignItems={props.alignment}
          style={{backgroundColor: props.backgroundColor}}>
        <HBox style={{padding: props.padding,}}>
            <TextInput
                autoCapitalize={props.autoCapitalize}
                placeholder={props.text}
                placeholderTextColor={props.textColor}
                multiline={props.multiline}
                editable={props.editable}
                style={{
                    flex: props.flex,
                    flexShrink: -1,
                    height: props.height,
                    //padding: props.padding,
                    backgroundColor: Colors.TRANSPARENT,
                    fontSize: props.fontSize,
                }}
                secureTextEntry={props.password}
                underlineColorAndroid={'transparent'}
                onChangeText={props.onChangeText}/>
            <Icon name={props.iconName} color={props.iconColor}/>
        </HBox>
        {/*<SystemIcon url={props.icon}/>*/}
    </HBox>

EditText.defaultProps = {
    editable: true,
    text: 'Text',
    fontSize: 14,
    multiline: false,
    textColor: Colors.BLACK,
    backgroundColor: Colors.WHITE,
    password: false,
    icon: IconType.EMPTY,
    iconName: 'perm_identity',
    iconColor: 'white',
    height: 60,
    flex: 1,
    alignment: 'center',
    padding: 20,
    onChangeText: null,
    autoCapitalize: 'none',
}
