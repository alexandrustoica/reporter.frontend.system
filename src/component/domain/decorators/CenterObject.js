import * as React from "react";
import {View} from "react-native";

export const CenterObject = ({style, children}) =>
	<View style={[{alignSelf: 'center', justifySelf: 'center'}, style]}>{children}</View>