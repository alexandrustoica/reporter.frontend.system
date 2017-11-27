import * as React from "react";
import {Text} from "react-native";

export const TextColor = ({color = 'black', children, style}) =>
	<Text style={[{color: color}, style]}>{children}</Text>