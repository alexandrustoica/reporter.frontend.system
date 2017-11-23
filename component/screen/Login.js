import React from "react";
import {TextField} from "../domain/TextField";
import {BottomButton} from "../domain/BottomButton";
import {AsyncStorage, KeyboardAvoidingView, View} from "react-native";
import Intro from "./Intro";
import FlexBuilder from "../styles/FlexBuilder";
import {FullButtonStyle, withBackgroundColor, withTextColor} from "../styles/Styles";
import {COLOR_BLUE} from "../styles/Colors";

class LoginForm extends React.Component {

    state = {username: '', password: ''}
    static LOGIN_ENDPOINT = 'http://192.168.0.32:8090/login'

    login = (username, password) => fetch(LoginForm.LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then((response) => response.headers.get("authorization"))
        .then((token) => AsyncStorage.setItem('authorization', token))
        .then(() => this.props.navigation.navigate('Tasks'));

    render = () =>
        <KeyboardAvoidingView
            behavior="padding"
            style={new FlexBuilder().withColumnFlex().withJustifyContent('center').withItemAlignment('center').build()}>
            <TextField input="Username"
                       onChangeText={(username) => this.state.username = username}
                       image={require('../../images/profile_icon.png')}/>
            <TextField input="Password"
                       onChangeText={(password) => this.state.password = password}
                       image={require('../../images/password_icon.png')}
                       password={true}/>
            <View style={new FlexBuilder().withRowFlex().build()}>
                <BottomButton
                    buttonStyle={[FullButtonStyle.button, withBackgroundColor(COLOR_BLUE)]}
                    textStyle={withTextColor('white')}
                    text='Login'
                    action={() => this.login(this.state.username, this.state.password)}/>
            </View>
        </KeyboardAvoidingView>
}


export default class Login extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<LoginForm navigation={this.props.navigation}/>}/>
}