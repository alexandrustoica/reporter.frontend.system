import * as React from "react";
import {View} from "react-native";

export const MarginContainer = ({margin = 0, children}) =>
	<View style={{margin: margin}}>{children}</View>