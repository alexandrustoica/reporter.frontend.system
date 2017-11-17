import React from "react";
import {TextField} from "../domain/TextField";
import {BottomButton} from "../domain/BottomButton";
import {KeyboardAvoidingView, View} from "react-native";
import Intro from "./Intro";
import {FullButtonStyle, withBackgroundColor, withTextColor} from "../styles/Styles";
import {COLOR_BLUE} from "../styles/Colors";
import FlexBuilder from "../styles/FlexBuilder";


const SignUpForm = () =>
    <KeyboardAvoidingView
        behavior="padding"
        style={new FlexBuilder().withColumnFlex().withJustifyContent('center').withItemAlignment('center').build()}>
        <TextField input="Username"
                   image={require('../../images/profile_icon.png')}/>
        <TextField input="Password"
                   image={require('../../images/password_icon.png')}
                   password={true}/>
        <TextField input="Confirm Password"
                   image={require('../../images/password_icon.png')}
                   password={true}/>
        <TextField input="Email"
                   image={require('../../images/email_icon.png')}/>
        <View style={new FlexBuilder().withRowFlex().build()}>
            <BottomButton
                buttonStyle={[FullButtonStyle.button, withBackgroundColor(COLOR_BLUE)]}
                textStyle={withTextColor('white')}
                text='Sign Up'
                action={() => console.log('Sign Up')}/>
        </View>
    </KeyboardAvoidingView>;

export default class SignUp extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<SignUpForm/>}/>
}
