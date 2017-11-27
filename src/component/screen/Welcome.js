import React from "react";
import {View} from "react-native";
import {FullButtonStyle, withBackgroundColor, withTextColor} from "../styles/Styles";
import {BottomButton} from "../domain/button/BottomButton";
import {COLOR_BLACK, COLOR_BLUE} from "../styles/Colors";
import FlexBuilder from "../styles/FlexBuilder";
import Intro from "./Intro";


const AccessButtons = ({navigation}) => <View style={new FlexBuilder().withRowFlex().build()}>
    <BottomButton
        buttonStyle={[FullButtonStyle.button, withBackgroundColor(COLOR_BLACK)]}
        textStyle={withTextColor('white')}
        text='Login'
        action={() => navigation.navigate('Login')}/>
    <BottomButton
        buttonStyle={[FullButtonStyle.button, withBackgroundColor(COLOR_BLUE)]}
        textStyle={withTextColor('white')}
        text='Sign Up'
        action={() => navigation.navigate('SignUp')}/></View>;

export default class Welcome extends React.Component {
    static navigationOptions = { header: null };
    render = () => <Intro content={<AccessButtons navigation={this.props.navigation}/>}/>
}
