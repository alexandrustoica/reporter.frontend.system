import * as React from "react";
import {Text} from "react-native";

export const NavigationBarText = ({color, align, children}) =>
	<Text style={{fontSize: 18, color: color, flex: 1, textAlign: align}}>{children}</Text>