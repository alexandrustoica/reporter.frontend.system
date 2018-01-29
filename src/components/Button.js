import {Text, TouchableOpacity} from "react-native";
import {CenterBox} from "../box/CenterBox";
import * as React from "react";
import {SystemIcon} from "../icon/SystemIcon";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/Icon";

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
			<SystemIcon url={props.icon}/>
			<Text style={{color: props.textColor, fontSize: props.textSize, textAlign: 'center', alignSelf: 'center'}}>
				{props.text}
			</Text>
		</CenterBox>
	</TouchableOpacity>

Button.defaultProps = {
	onPress: null,
	backgroundColor: Colors.BLACK,
	flex: 1,
	width: null,
	icon: IconType.EMPTY,
	height: 70,
	textColor: Colors.WHITE,
	text: 'Button',
	textSize: 16,
}