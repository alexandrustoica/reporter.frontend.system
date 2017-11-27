import {Text} from "react-native";
import {TextColor} from "./TextColor";
import {TextSize} from "./TextSize";
import * as React from "react";

export const Logo = () =>
	<TextColor color={'white'}><TextSize size={35}>
		<Text>taskly</Text>
	</TextSize></TextColor>
