import React from "react";
import {TextField} from "../domain/TextField";
import {BottomButton} from "../domain/BottomButton";
import {Image, KeyboardAvoidingView, Text, View, StyleSheet} from "react-native";

export default class Login extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Login',
	};
	render = () => <View>
		<Image style={style.backgroundImage}
		       source={require("../../images/login_background.png")}/>
		<KeyboardAvoidingView
			behavior="padding"
			style={style.container}>
			<BottomButton
				action={() => console.log("Press")}
				name="LOGIN"/>
			<TextField input="Password"
			           image={require('../../images/password_icon.png')}
			           password={true}/>
			<TextField input="Username"
			           image={require('../../images/profile_icon.png')}/>
			<Text style={style.logo}>taskly</Text>
		</KeyboardAvoidingView></View>
}

const style = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		flexDirection: 'column-reverse',
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		flex: 1
	},
	logo: {
		fontFamily: 'Montserrat',
		height: 200,
		fontSize: 35,
		color: 'white',
		alignSelf: 'center',
	}
});