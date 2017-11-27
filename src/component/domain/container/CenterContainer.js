import * as React from "react";
import {View} from "react-native";

export const CenterContainer = ({style, children}) =>
	<View
		style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}, style]}>
		{children}
	</View>