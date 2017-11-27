import FlexBuilder from "../../styles/FlexBuilder";
import {IconType} from "../shape/Icon";
import * as React from "react";
import {View} from "react-native";
import {SystemIcon} from "../shape/Icon";
import {NavigationBarText} from "../text/NavigationBarText";

export default class NavigationBar extends React.Component {

	flexBuilder = new FlexBuilder();

	static defaultProps = {
		leftIcon: IconType.PROFILE_DARK,
		leftAction: () => console.log("Left Button Pressed"),
		rightIcon: IconType.PROFILE_DARK,
		rightAction: () => console.log("Right Button Pressed"),
		color: 'transparent',
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
