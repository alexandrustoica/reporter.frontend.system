import * as React from "react";
import {Text} from "react-native";
import {TextSize} from "./TextSize";
import {TextColor} from "./TextColor";

export const NavigationBarText = ({color, align, children}) =>
	<TextSize size={20} style={{flex: 1, textAlign: align}}>
		<TextColor color={color}>
			<Text>{children}</Text>
		</TextColor></TextSize>