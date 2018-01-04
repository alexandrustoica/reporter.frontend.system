import {Text, TouchableOpacity} from 'react-native';
import * as React from "react";
import {CenterContainer} from "../container/CenterContainer";
import {IconType} from "../../icon/Icon";
import {SystemIcon} from "../../icon/SystemIcon";

export class BottomButton extends React.Component {
	render = () =>
		<TouchableOpacity
			onPress={this.props.action}
			style={{backgroundColor: this.props.backgroundColor,
				height: this.props.height, width: '100%'}}>
			<CenterContainer>
				<SystemIcon url={this.props.icon !== null ? this.props.icon : IconType.EMPTY}/>
				<Text style={{fontSize: this.props.fontSize, color: this.props.color}}>{this.props.text}</Text>
			</CenterContainer>
		</TouchableOpacity>
}
