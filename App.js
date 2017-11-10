import React from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {TextField} from "./component/domain/TextField";
import {FullBottomButton} from "./component/domain/FullBottomButton";

export default class App extends React.Component {
	render = () =>
		<View>
			<Image style={style.backgroundImage} source={require("./images/login_background.png")}/>
			<KeyboardAvoidingView
				behavior="padding"
				style={style.container}>
				<FullBottomButton
					action={() => console.log("Press")}
					name="LOGIN"/>
				<TextField input="Password"
				           image={require('./images/password_icon.png')}
				           password={true}/>
				<TextField input="Username" image={require('./images/profile_icon.png')}/>
				<Text style={style.logo}>taskly</Text>
			</KeyboardAvoidingView>
		</View>
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
