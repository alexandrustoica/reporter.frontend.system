import React from "react";
import Intro from "./Intro";
import {Colors} from "../elements/color/Colors";
import {IconType} from "../elements/icon/IconType";
import {EditText} from "../elements/components/EditText";
import {Button} from "../elements/components/Button";
import {AsyncStorage, Keyboard, KeyboardAvoidingView} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";
import {SystemAction} from "../service/SystemEpicAction";
import * as Rx from "rxjs";
import {store} from "../utils/store";

class LoginForm extends React.Component {

    __unsubscribe = store.subscribe(() => {
        if (store.getState().systemReducer.token !== undefined) {
            AsyncStorage.setItem('token', store.getState().systemReducer.token)
            console.log(store.getState().systemReducer.token)
            this.__unsubscribe()
            this.__keyboardHideSubscription.unsubscribe();
            this.__keyboardShowSubscription.unsubscribe();
            this.props.navigation.navigate('Reports')
        }
    })
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

    constructor(props) {
        super(props)
        this.state = {username: '', password: '', flexValue: 2}
    }

    async componentWillMount() {
        //store.dispatch(SystemAction.updateToken())

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
}

export default class Login extends React.Component {
    static navigationOptions = {header: null};
    render = () =>
        <Intro
            content={<LoginForm {...this.props}/>}/>
}