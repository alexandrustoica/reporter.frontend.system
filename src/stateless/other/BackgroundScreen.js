import {Image} from "react-native";
import * as React from "react";
import {Screen} from "../decorators/Screen";

export const BackgroundScreen = () =>
	<Screen>
		<Image
			style={{width: '100%', position: 'absolute'}}
			source={require('../../../images/login_background.png')}/>
	</Screen>

