import {Text} from "react-native";
import {TextColor} from "./TextColor";
import {TextSize} from "./TextSize";
import * as React from "react";
import {Colors} from "../../styles/Colors";

export const Logo = () =>
	<Text>
		<TextColor color={Colors.WHITE}><TextSize size={35}>
			<Text>meeseeks</Text>
		</TextSize></TextColor>
		<TextColor color={Colors.BLUE}><TextSize size={35}>
			<Text>box</Text>
		</TextSize></TextColor>
	</Text>
