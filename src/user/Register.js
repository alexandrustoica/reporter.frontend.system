import React from "react";
import Intro from "./Intro";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/Icon";
import {Button} from "../components/Button";
import {EditText} from "../components/EditText";
import {Keyboard, KeyboardAvoidingView, ScrollView} from "react-native";
import {NavigationBar} from "../stateless/NavigationBar";


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

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow',
            () => this.setState({flexValue: 10}));
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide',
            () => this.setState({flexValue: 10}));
    }

    componentWillUnmount() {
        this.keyboardWillHideSub.remove();
        this.keyboardWillShowSub.remove();
    }

    render = () =>
        <KeyboardAvoidingView behaviour={'padding'} style={{flex: this.state.flexValue}}>
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
                text='Register'/>
            </ScrollView>
        </KeyboardAvoidingView>
}

export default class Register extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<RegisterForm {...this.props}/>}/>
}
