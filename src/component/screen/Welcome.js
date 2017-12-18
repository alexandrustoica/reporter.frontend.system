import React from "react";
import {View} from "react-native";
import {BottomButton} from "../../stateless/button/BottomButton";
import {Colors,} from "../../stateless/color/Colors";
import FlexBuilder from "../styles/FlexBuilder";
import Intro from "./Intro";


const AccessButtons = ({navigation}) =>
	<View style={[{width: "100%"}, new FlexBuilder().withColumnFlex().build()]}>
		<BottomButton
			backgroundColor={Colors.WINTER_BLUE} height={70}
			color={Colors.WHITE} fontSize={16} text='Login'
			action={() => navigation.navigate('Login')}/>
		<BottomButton
			backgroundColor={Colors.BLUE} height={70}
			color={Colors.WHITE} fontSize={16} text='Register'
			action={() => navigation.navigate('Register')}/>
	</View>

export default class Welcome extends React.Component {
	static navigationOptions = {header: null};
	render = () => <Intro
		content={<AccessButtons navigation={this.props.navigation}/>}/>
}
