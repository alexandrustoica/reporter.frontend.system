import {Image, TouchableOpacity} from "react-native";
import * as React from "react";
import {Colors} from "../color/Colors";

export const Icon = ({url = null, size, margin, onPress}) =>
    <TouchableOpacity
        style={{width: size * 2, height: size * 2}}
        onPress={onPress}>
        <Image source={url} style={{
            width: url === null ? 0 : size.width,
            height: url === null ? 0 : size.height,
            margin: url === null ? 0 : margin
        }}/>
    </TouchableOpacity>

Icon.defaultProps = {
    url: Icon.EMPTY,
    size: 20,
    margin: 20,
    onPress: () => console.log("Button Press!")
}

export const IconType = {
    PLUS_LIGHT: require('../../images/plus_icon_white.png'),
    PLUS_DARK: require('../../images/plus_icon_black.png'),
    PASSWORD_DARK: require('../../images/password_icon_black.png'),
    PASSWORD_LIGHT: require('../../images/password_icon_white.png'),
    PROFILE_DARK: require('../../images/profile_icon_black.png'),
    PROFILE_LIGHT: require('../../images/profile_icon_white.png'),
    LOCATION_LIGHT: require('../../images/location_icon_white.png'),
    LOCATION_DARK: require('../../images/location_icon_black.png'),
    TIME_LIGHT: require('../../images/time_icon_white.png'),
    TIME_DARK: require('../../images/time_icon_black.png'),
    DONE_LIGHT: require('../../images/done_icon_white.png'),
    DONE_DARK: require('../../images/done_icon_black.png'),
    SEARCH_LIGHT: require('../../images/search_icon_white.png'),
    SEARCH_DARK: require('../../images/search_icon_black.png'),
    BACK_DARK: require('../../images/back_icon_black.png'),
    BACK_LIGHT: require('../../images/back_icon_white.png'),
    DONE_ICON_HUGE: require('../../images/done_icon_huge.png'),
    MENU_ICON: require('../../images/menu_icon.png'),
    DELETE_LIGHT: require('../../images/delete_icon.png'),
    STATS_ICON: require('../../images/stats_icon.png'),
    REPORTS_ICON: require('../../images/reports_icon.png'),
    LOGOUT_ICON: require('../../images/logout_icon.png'),
    EMPTY: null,
}