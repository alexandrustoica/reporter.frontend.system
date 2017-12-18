import * as React from "react";
import {View} from "react-native";

export const CenterObject = ({style, children}) =>
	<View style={[{alignSelf: 'center'}, style]}>{children}</View>