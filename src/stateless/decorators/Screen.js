import * as React from "react";
import {View} from "react-native";

export const Screen = ({backgroundColor, children, size}) =>
	<View style={{flex: 1, backgroundColor: backgroundColor}}>
		{children}
	</View>