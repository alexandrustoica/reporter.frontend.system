import {View} from "react-native";
import React from "react";
import FlexBuilder from "../styles/FlexBuilder";
import {IconType} from "../domain/Icon";
import TopBarNavigation from "../domain/TopNavigationBar";


export default class Tasks extends React.Component {
	static navigationOptions = {header: null};
	flexBuilder = new FlexBuilder().withFlexValue(1)
		.withColumnFlex().withItemAlignment("center");
	render = () => <View>
		<TopBarNavigation
			leftIcon={IconType.PASSWORD_DARK}
			rightIcon={IconType.PASSWORD_DARK}
			text={"Tasks"}/>
	</View>
}

