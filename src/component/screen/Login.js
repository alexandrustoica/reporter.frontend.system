import React from "react";
import {TextField} from "../../stateless/complex/TextField";
import {BottomButton} from "../../stateless/button/BottomButton";
import {KeyboardAvoidingView, Text, View} from "react-native";
import Intro from "./Intro";
import FlexBuilder from "../styles/FlexBuilder";
import {Colors} from "../../stateless/color/Colors";
import {IconType} from "../../stateless/shape/Icon";
import NavigationBar from "../../stateless/complex/NavigationBar";
import {LoginService} from "../../service/LoginService";
import {CenterContainer} from "../../stateless/container/CenterContainer";


class LoginForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {username: '', password: '', errorMessage: ''}
	}

	render = () =>
		<KeyboardAvoidingView
			behavior="padding">
			<CenterContainer>
				<Text>{this.state.errorMessage}</Text>
				<NavigationBar
					text={""}
					leftIcon={IconType.BACK_LIGHT}
					leftAction={() => this.props.navigation.goBack()}/>
				<TextField input="Username"
				           onChangeText={(username) => this.state.username = username}
				           image={IconType.PROFILE_DARK}/>
				<TextField input="Password"
				           onChangeText={(password) => this.state.password = password}
				           image={IconType.PASSWORD_DARK}
				           password={true}/>
				<View style={new FlexBuilder().withRowFlex().build()}>
					<BottomButton
						backgroundColor={Colors.BLUE} height={70}
						color={Colors.WHITE} fontSize={16} text='Login'
						action={() => new LoginService(this.props.navigation).login(this.state.username, this.state.password)}/>
				</View>
			</CenterContainer>
		</KeyboardAvoidingView>
}


export default class Login extends React.Component {
	static navigationOptions = {header: null};
	render = () => <Intro
		content={<LoginForm navigation={this.props.navigation}/>}/>
}