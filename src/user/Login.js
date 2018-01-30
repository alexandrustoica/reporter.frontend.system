import React from "react";
import Intro from "./Intro";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/IconType";
import {EditText} from "../components/EditText";
import R from 'ramda';
import {Button} from "../components/Button";
import {KeyboardAvoidingView} from "react-native";
import {AsyncStorage, Keyboard} from "react-native"
import {NavigationBar} from "../components/NavigationBar";
import {LoginService} from "../service/LoginService";

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {username: '', password: '', flexValue: 2}
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow',
            () => this.setState({flexValue: 10}));
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide',
            () => this.setState({flexValue: 2}));
    }

    componentWillUnmount() {
        this.keyboardWillHideSub.remove();
        this.keyboardWillShowSub.remove();
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
        <KeyboardAvoidingView
            behavior={'padding'}
            onKeyboardChange={() => this.setState({flexValue: 10})}
            style={{flex: this.state.flexValue}}>
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
    render = () =>
        <Intro
            content={<LoginForm {...this.props}/>}/>
}