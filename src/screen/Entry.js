import * as React from "react";
import {VBox} from "../utils/VBox";
import {Logo} from "../stateless/text/Logo";
import {Screen} from "../stateless/decorators/Screen";
import {Text} from "react-native";


export const Entry = (props) =>
	<VBox>
		<Screen background={null}>
			<Logo/>
		</Screen>
	</VBox>

Entry.navigationOptions = { header: null }

