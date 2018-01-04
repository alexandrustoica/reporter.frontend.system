import React from "react";
import Intro from "../intro/Intro";
import {Colors} from "../stateless/color/Colors";
import {IconType} from "../icon/Icon";
import NavigationBar from "../stateless/complex/NavigationBar";
import {EditText} from "../components/EditText";
import R from 'ramda';
import {Button} from "../components/Button";
import {KeyboardAvoidingView} from "react-native";
import {LoginService} from "./LoginService";
import {AsyncStorage} from "react-native"

class LoginForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {username: '', password: ''}
	}

	_getTokenFromServerByLoggingIn = async () =>
		await new LoginService().login(this.state.username, this.state.password)

	_saveTokenToLocalStorage = async (token) =>
		await AsyncStorage.setItem('token', token)

	_goToReportsScreen = () => this.props.navigation.navigate('Reports')

	_onLoginButtonClick = async () =>
		R.compose(this._goToReportsScreen, this._saveTokenToLocalStorage)
		(await this._getTokenFromServerByLoggingIn())

	render = () =>
		<KeyboardAvoidingView behavior={"padding"} style={{flex: 2}}>
			<NavigationBar
				text={""}
				leftIcon={IconType.BACK_LIGHT}
				leftAction={() => this.props.navigation.goBack()}
				rightIcon={IconType.EMPTY}/>
			<EditText
				text={'Username'}
				icon={IconType.PROFILE_DARK}
				onChangeText={async (username) =>
					await this.setState({username: username})}/>
			<EditText
				text={'Password'}
				password={true}
				icon={IconType.PASSWORD_DARK}
				onChangeText={async (password) =>
					await this.setState({password: password})}/>
			<Button
				backgroundColor={Colors.BLUE}
				onPress={() => this._onLoginButtonClick()}
				text='Login'/>
		</KeyboardAvoidingView>
}


export default class Login extends React.Component {
	static navigationOptions = {header: null};
	render = () => <Intro
		content={<LoginForm {...this.props}/>}/>
}