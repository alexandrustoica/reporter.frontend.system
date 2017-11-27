import React from "react";
import {TextField} from "../domain/complex/TextField";
import {BottomButton} from "../domain/button/BottomButton";
import {KeyboardAvoidingView, View} from "react-native";
import Intro from "./Intro";
import {
	FullButtonStyle,
	withBackgroundColor,
	withTextColor
} from "../styles/Styles";
import {COLOR_BLUE} from "../styles/Colors";
import FlexBuilder from "../styles/FlexBuilder";
import {IconType} from "../domain/shape/Icon";
import NavigationBar from "../domain/complex/NavigationBar";
import {LoginService} from "../service/LoginService";

class SignUpForm extends React.Component {

	static REGISTER_ENDPOINT = "http://192.168.0.32:8090/user/register";

	constructor(props) {
		super(props)
		this.state = {username: '', password: '', confirmPassword: '', email: ''}
	}

	signUp = (username, password, confirmPassword, email) =>
		password !== confirmPassword ?
			console.log("Not Same Password") :
			fetch(SignUpForm.REGISTER_ENDPOINT, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',},
				body: JSON.stringify({
					username: username,
					password: password,
					email: email,
				})})
				.catch((error) => console.log(error))
				.then((response) => new LoginService(this.props.navigation).login(username, password))

	render = () =>
		<KeyboardAvoidingView
			behavior="padding"
			style={new FlexBuilder().withColumnFlex().withJustifyContent('center').withItemAlignment('center').build()}>
			<NavigationBar
				text={""}
				leftIcon={IconType.BACK_LIGHT}
				leftAction={() => this.props.navigation.goBack()}
				rightIcon={IconType.EMPTY}/>
			<TextField input="Username"
			           onChangeText={(username) => this.state.username = username}
			           image={require('../../../images/profile_icon.png')}/>
			<TextField input="Password"
			           onChangeText={(password) => this.state.password = password}
			           image={require('../../../images/password_icon.png')}
			           password={true}/>
			<TextField input="Confirm Password"
			           onChangeText={(confirmPassword) => this.state.confirmPassword = confirmPassword}
			           image={require('../../../images/password_icon.png')}
			           password={true}/>
			<TextField input="Email"
			           onChangeText={(email) => this.state.email = email}
			           image={require('../../../images/email_icon.png')}/>
			<View style={new FlexBuilder().withRowFlex().build()}>
				<BottomButton
					buttonStyle={[FullButtonStyle.button, withBackgroundColor(COLOR_BLUE)]}
					textStyle={withTextColor('white')}
					text='Sign Up'
					action={() => this.signUp(this.state.username, this.state.password,
						this.state.confirmPassword, this.state.email)}/>
			</View>
		</KeyboardAvoidingView>;
}

export default class SignUp extends React.Component {
	static navigationOptions = {header: null};
	render = () => <Intro
		content={<SignUpForm navigation={this.props.navigation}/>}/>
}
