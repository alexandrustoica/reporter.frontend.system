import React from "react";
import {TextField} from "../../stateless/complex/TextField";
import {BottomButton} from "../../stateless/button/BottomButton";
import {KeyboardAvoidingView, View} from "react-native";
import Intro from "./Intro";
import {Colors} from "../../stateless/color/Colors";
import FlexBuilder from "../styles/FlexBuilder";
import {IconType} from "../../stateless/shape/Icon";
import NavigationBar from "../../stateless/complex/NavigationBar";
import {RegisterService} from "../../service/RegisterService";

class RegisterForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {username: '', password: '', confirmPassword: '', email: '', name: ''}
	}

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
			<TextField input="Name"
			           onChangeText={(name) => this.state.name = name}
			           image={IconType.PROFILE_DARK}/>
			<View style={new FlexBuilder().withRowFlex().build()}>
				<BottomButton
					backgroundColor={Colors.BLUE} height={70}
					color={Colors.WHITE} fontSize={16} text='Register'
					action={() => new RegisterService(this.props.navigation).signUp(this.state.username,
						this.state.password, this.state.confirmPassword, this.state.email, this.state.name)}/>
			</View>
		</KeyboardAvoidingView>;
}

export default class Register extends React.Component {
	static navigationOptions = {header: null};
	render = () => <Intro
		content={<RegisterForm navigation={this.props.navigation}/>}/>
}
