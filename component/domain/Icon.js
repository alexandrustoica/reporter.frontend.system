import {TouchableOpacity, Image} from "react-native";
import * as React from "react";

export const Icon = ({url, size, margin, onPress}) =>
	<TouchableOpacity onPress={onPress}>
		<Image source={url}
		       style={{width: size.width, height: size.height, margin: margin}}/>
	</TouchableOpacity>

export const SystemIcon = ({url, onPress}) =>
	<Icon url={url} size={{width: 20, height: 20}} margin={20}
	      onPress={onPress}/>

export const IconType = {
	PLUS_LIGHT: require('../../images/plus_icon.png'),
	PASSWORD_DARK: require('../../images/password_icon.png')
}