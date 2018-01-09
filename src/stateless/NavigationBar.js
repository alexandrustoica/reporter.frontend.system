import FlexBuilder from "../component/styles/FlexBuilder";
import * as React from "react";
import {View} from "react-native";
import {SystemIcon} from "../icon/SystemIcon";
import {NavigationBarText} from "./text/NavigationBarText";

export default class NavigationBar extends React.Component {

	static defaultProps = {
		leftIcon: null,
		leftAction: () => console.log("Left Button Pressed"),
		rightIcon: null,
		rightAction: () => console.log("Right Button Pressed"),
		color: 'transparent',
		text: 'Text',
		textColor: 'black',
		textAlign: 'left'
	}

	render = () =>
		<View style={[{paddingTop: 22, backgroundColor: this.props.color},
			new FlexBuilder().withItemAlignment("center").withRowFlex().build()]}>
			<SystemIcon url={this.props.leftIcon}
			            onPress={this.props.leftAction}/>
			<NavigationBarText color={this.props.textColor}
			                   align={this.props.align}>
				{this.props.text}</NavigationBarText>
			<SystemIcon url={this.props.rightIcon}
			            onPress={this.props.rightAction}/>
		</View>
}
