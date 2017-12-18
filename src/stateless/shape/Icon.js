import {TouchableOpacity, Image} from "react-native";
import * as React from "react";

export const Icon = ({url=null, size, margin, onPress}) =>
	<TouchableOpacity
		onPress={onPress === undefined ? () => {} : onPress}>
		<Image source={url} style={{
			width: size.width, height: size.height,
			margin: margin === undefined ? 0 : margin
		}}/>
	</TouchableOpacity>

export const SystemIcon = ({url, onPress}) =>
	<Icon url={url} size={{width: 20, height: 20}} margin={20}
	      onPress={onPress}/>

export const IconType = {
	PLUS_LIGHT: require('../../../images/plus_icon_white.png'),
	PLUS_DARK: require('../../../images/plus_icon_black.png'),
	PASSWORD_DARK: require('../../../images/password_icon_black.png'),
	PASSWORD_LIGHT: require('../../../images/password_icon_white.png'),
	PROFILE_DARK: require('../../../images/profile_icon_black.png'),
	PROFILE_LIGHT: require('../../../images/profile_icon_white.png'),
	LOCATION_LIGHT: require('../../../images/location_icon_white.png'),
	LOCATION_DARK: require('../../../images/location_icon_black.png'),
	TIME_LIGHT: require('../../../images/time_icon_white.png'),
	TIME_DARK: require('../../../images/time_icon_black.png'),
	DONE_LIGHT: require('../../../images/done_icon_white.png'),
	DONE_DARK: require('../../../images/done_icon_black.png'),
	SEARCH_LIGHT: require('../../../images/search_icon_white.png'),
	SEARCH_DARK: require('../../../images/search_icon_black.png'),
	BACK_DARK: require('../../../images/back_icon_black.png'),
	BACK_LIGHT: require('../../../images/back_icon_white.png'),
	DONE_ICON_HUGE: require('../../../images/done_icon_huge.png'),
	EMPTY: '',
}