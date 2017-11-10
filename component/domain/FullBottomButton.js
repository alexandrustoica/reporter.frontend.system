import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export class FullBottomButton extends React.Component {
	render = () =>
		<TouchableOpacity
			onPress={this.props.action}
			style={style.button}><Text style={style.text}>{this.props.name}</Text></TouchableOpacity>
}

const style = StyleSheet.create({
	button: {
		height: 70,
		width: '100%',
		backgroundColor: '#97CBF1',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: { }
});


