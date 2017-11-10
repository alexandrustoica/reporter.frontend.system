import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

export class TextField extends React.Component {
	render = () =>
		<View style={style.container}>
			<TextInput
				placeholder={this.props.input}
				placeholderTextColor='#A2A2A2'
				style={style.field}
				secureTextEntry={this.props.password}
				underlineColorAndroid={'transparent'}
				onChangeText={(text) => {
					console.log(text)
				}}/>
			<Image source={this.props.image} style={{width: 20, height: 20}}/>
		</View>
}

const style = StyleSheet.create({
	container: {
		height: 70,
		width: '100%',
		paddingRight: 20,
		paddingLeft: 20,
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 1,
		borderColor: '#F9F9F9',
		backgroundColor: 'white',
	},
	field: {
		flexGrow: 1,
	}
});


