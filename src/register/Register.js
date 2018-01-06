import React from "react";
import Intro from "../intro/Intro";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/Icon";
import NavigationBar from "../stateless/complex/NavigationBar";
import {Button} from "../components/Button";
import {EditText} from "../components/EditText";
import {KeyboardAvoidingView} from "react-native";


class RegisterForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {username: '', password: '', confirmPassword: '', email: '', name: ''}
	}

	render = () =>
		<KeyboardAvoidingView style={{flex: 10}}>
			<NavigationBar
				text={""}
				leftIcon={IconType.BACK_LIGHT}
				leftAction={() => this.props.navigation.goBack()}
				rightIcon={IconType.EMPTY}/>
			<EditText
				text={'Name'}
				icon={IconType.PROFILE_DARK}
				onChangeText={async (name) =>
					await this.setState({name: name})}/>
			<EditText
				text={'Username'}
				icon={IconType.PROFILE_DARK}
				onChangeText={async (username) =>
					await this.setState({username: username})}/>
			<EditText
				text={'Email'}
				icon={IconType.PROFILE_DARK}
				onChangeText={async (email) =>
					await this.setState({email: email})}/>
			<EditText
				text={'Password'}
				password={true}
				icon={IconType.PASSWORD_DARK}
				onChangeText={async (password) =>
					await this.setState({password: password})}/>
			<EditText
				text={'Confirm Password'}
				password={true}
				icon={IconType.PASSWORD_DARK}
				onChangeText={async (confirmPassword) =>
					await this.setState({confirmPassword: confirmPassword})}/>
			<Button
				backgroundColor={Colors.BLACK}
				height={70}
				text='Register'/>
		</KeyboardAvoidingView>
}

export default class Register extends React.Component {
	static navigationOptions = {header: null};
	render = () => <Intro content={<RegisterForm {...this.props}/>}/>
}
