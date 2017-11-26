import FlexBuilder from "../styles/FlexBuilder";
import {IconType} from "../domain/Icon";
import * as React from "react";
import {View} from "react-native";
import {SystemIcon} from "./Icon";
import {NavigationBarText} from "./Text";

export default class TopBarNavigation extends React.Component {

	flexBuilder = new FlexBuilder();

	static defaultProps = {
		leftIcon: IconType.PLUS_LIGHT,
		leftAction: () => console.log("Left Button Pressed"),
		rightIcon: IconType.PLUS_LIGHT,
		rightAction: () => console.log("Right Button Pressed"),
		color: 'white',
		text: 'Text',
		textColor: 'black',
		textAlign: 'left'
	}

	render = () =>
		<View style={[{paddingTop: 22, backgroundColor: this.props.color},
			this.flexBuilder.withItemAlignment("center").withRowFlex().build()]}>
			<SystemIcon url={this.props.leftIcon}
			            onPress={this.props.leftAction}/>
			<NavigationBarText color={this.props.textColor}
			                   align={this.props.align}>
				{this.props.text}</NavigationBarText>
			<SystemIcon url={this.props.rightIcon}
			            onPress={this.props.rightAction}/>
		</View>
}
