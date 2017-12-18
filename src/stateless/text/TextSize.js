import * as React from "react";
import {Text} from "react-native";

export const TextSize = ({size = 0, children, style}) =>
	<Text style={[{fontSize: size}, style]}>{children}</Text>