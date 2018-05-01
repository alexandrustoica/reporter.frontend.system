import React from "react";
import Intro from "./Intro";
import {Colors} from "../elements/color/Colors";
import {IconType} from "../elements/icon/IconType";
import {Button} from "../elements/components/Button";
import {EditText} from "../elements/components/EditText";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";
import {store} from "../utils/store";
import {SystemAction} from "../service/SystemEpicAction";

export class LoginAfterRegister extends React.Component {

    __loginUnsubscribe = store.subscribe(() => {
        const token = store.getState().systemReducer.token
        if (token !== undefined) {
            this.__loginUnsubscribe()
            this.props.navigation.navigate('Reports')
        }
    })
    render = () => null

    constructor(props) {
        super(props)
        const currentUser = store.getState().systemReducer.currentUser
        store.dispatch(SystemAction.login({
            username: currentUser.username,
            password: currentUser.password
        }))
    }

    componentWillUnmount() {
        this.__loginUnsubscribe();
    }
}

class RegisterForm extends React.Component {

    __registerUnsubscribe = store.subscribe(() => {
        const currentUser = store.getState().systemReducer.currentUser
        if (currentUser !== undefined) {
            this.__registerUnsubscribe();
            this.props.navigation.navigate('LoginAfterRegister')
        }
    })
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
}

export default class Register extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<RegisterForm {...this.props}/>}/>
}
