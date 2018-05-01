import * as React from "react";
import {View} from "react-native";
import {Colors} from "../../color/Colors";

export const Screen = (props) =>
	<View style={[{flex: 1, backgroundColor: props.backgroundColor}, props.style]}>
		{props.children}
	</View>

Screen.defaultProps = {
    backgroundColor: Colors.WHITE,
    style: {}
}