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
import {SystemAction} from "./Actions";
import {store} from "../utils/store";
import * as Rx from "rxjs";

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {username: '', password: '', flexValue: 2}
    }

    __unsubscribe = store.subscribe(() => {
        if(store.getState().systemReducer.token !== undefined) {
            this.__unsubscribe()
            this.__keyboardHideSubscription.unsubscribe();
            this.__keyboardShowSubscription.unsubscribe();
            this.props.navigation.navigate('Reports')
        }
    })

    componentWillMount() {
        this.__keyboardShowSubscription = Rx.Observable
            .fromEvent(Keyboard, 'keyboardWillShow')
            .subscribe(() => this.setState({flexValue: 10}))

        this.__keyboardHideSubscription = Rx.Observable
            .fromEvent(Keyboard, 'keyboardWillHide')
            .subscribe(() => this.setState({flexValue: 2}))
    }

    componentWillUnmount() {
        this.__unsubscribe();
        this.__keyboardHideSubscription.unsubscribe();
        this.__keyboardShowSubscription.unsubscribe();
    }

    _onLoginButtonClick = async () =>
        store.dispatch(SystemAction.login({
            username: this.state.username,
            password: this.state.password
        }))

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