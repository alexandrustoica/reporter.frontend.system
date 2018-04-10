import React from "react";
import Intro from "./Intro";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/IconType";
import {Button} from "../components/Button";
import {EditText} from "../components/EditText";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import {NavigationBar} from "../components/NavigationBar";
import {store} from "../utils/store";
import {SystemAction} from "./Actions";

export class LoginAfterRegister extends React.Component {

    constructor(props) {
        super(props)
        const currentUser = store.getState().systemReducer.currentUser
        store.dispatch(SystemAction.login({
            username: currentUser.username,
            password: currentUser.password
        }))
    }

    __loginUnsubscribe = store.subscribe(() => {
        const token = store.getState().systemReducer.token
        if(token !== undefined) {
            this.__loginUnsubscribe()
            this.props.navigation.navigate('Reports')
        }
    })

    componentWillUnmount() {
        this.__loginUnsubscribe();
    }

    render = () => null
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            name: '',
            flexValue: 10
        }
    }

    __registerUnsubscribe = store.subscribe(() => {
        const currentUser = store.getState().systemReducer.currentUser
        if (currentUser !== undefined) {
            this.__registerUnsubscribe();
            this.props.navigation.navigate('LoginAfterRegister')
        }
    })

    componentWillUnmount() {
        this.__registerUnsubscribe();
    }

    __onRegisterButtonClick() {
        store.dispatch(SystemAction.register({
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            email: this.state.email,
            name: this.state.name
        }))
    }

    render = () =>
        <KeyboardAvoidingView behaviour={'padding'}
                              style={{flex: this.state.flexValue}}>
            <NavigationBar
                text={""}
                leftIcon={IconType.BACK_LIGHT}
                leftAction={() => this.props.navigation.goBack()}
                rightIcon={IconType.EMPTY}/>
            <ScrollView>
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
                    onPress={() => this.__onRegisterButtonClick()}
                    text='Register'/>
            </ScrollView>
        </KeyboardAvoidingView>
}

export default class Register extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<RegisterForm {...this.props}/>}/>
}
