import {Image} from "react-native";
import * as React from "react";
import {AbsoluteContainer} from "../container/AbsoluteContainer";
import {Screen} from "../decorators/Screen";

export const BackgroundScreen = () =>
	<AbsoluteContainer><Screen>
		<Image source={require("../../../../images/login_background.png")}/>
	</Screen></AbsoluteContainer>

