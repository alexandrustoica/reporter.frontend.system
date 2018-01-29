import {HBox} from "../box/HBox";
import * as React from "react";
import {TextInput} from "react-native";
import {SystemIcon} from "../icon/SystemIcon";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/Icon";

export const EditText = (props) =>
	<HBox height={props.height}
	      alignItems={props.alignment}
	      style={{backgroundColor: props.backgroundColor}}>
		<TextInput
			placeholder={props.text}
			placeholderTextColor={props.textColor}
            multiline={props.multiline}
			style={{
				flex: props.flex,
                flexShrink: -1,
				height: props.height,
				padding: props.padding,
				backgroundColor: Colors.TRANSPARENT,
				fontSize: props.fontSize,
			}}
			secureTextEntry={props.password}
			underlineColorAndroid={'transparent'}
			onChangeText={props.onChangeText}/>
		<SystemIcon url={props.icon}/>
	</HBox>

EditText.defaultProps = {
	text: 'Text',
	fontSize: 14,
    multiline: false,
	textColor: Colors.BLACK,
	backgroundColor: Colors.WHITE,
	password: false,
	icon: IconType.EMPTY,
	height: 70,
	flex: 1,
	alignment: 'center',
	padding: 20,
	onChangeText: null,
}
