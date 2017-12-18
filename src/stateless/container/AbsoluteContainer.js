import {View} from "react-native";
import * as React from "react";

export const AbsoluteContainer = ({style, children}) =>
	<View style={[style, {position: 'absolute'}]}>{children}</View>