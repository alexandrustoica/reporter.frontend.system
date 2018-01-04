import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import {CenterBox} from "./CenterBox";



export const ButtonBase = (props) =>
	<TouchableOpacity
		onPress={props.onPress}
		style={{
			backgroundColor: props.backgroundColor,
			height: props.height,
			width: props.width,
			flex: props.flex,
		}}>
		<CenterBox>
			<Text style={{color: props.textColor}}>
				{props.text}
			</Text>
		</CenterBox>
	</TouchableOpacity>

ButtonBase.defaultProps = {
	height: 70,
	flex: 1,
	width: null,
	text: 'Button Text',
	backgroundColor: 'white',
	textColor: 'white',
	onPress: () => console.log("Pressed")
}

// class ButtonBase extends React.Component {
// 	render = () =>
// 		<TouchableOpacity
// 			onPress={this.props.action}
// 			style={{backgroundColor: this.props.backgroundColor,
// 				height: this.props.height, width: '100%'}}>
// 			<CenterContainer>
// 				<SystemIcon url={this.props.icon !== null ? this.props.icon : IconType.EMPTY}/>
// 				<Text style={{fontSize: this.props.fontSize, color: this.props.color}}>{this.props.text}</Text>
// 			</CenterContainer>
// 		</TouchableOpacity>
// }
