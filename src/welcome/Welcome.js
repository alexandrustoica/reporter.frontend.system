import React from "react";
import Intro from "../intro/Intro";
import {Box} from "../box/Box";
import {Colors} from "../stateless/color/Colors";
import {HBox} from "../box/HBox";
import {Button} from "../components/Button";


const AccessButtons = (props) =>
	<Box justifyContent={'flex-end'} flex={0}>
		<HBox flex={null}>
			<Button height={70}
			        text={'Login'}
			        onPress={() => props.navigation.navigate('Login')}
					backgroundColor={Colors.BLUE}/>
			<Button height={70}
			        onPress={() => props.navigation.navigate('Register')}
			        text={'Register'}/>
		</HBox>
	</Box>


export default class Welcome extends React.Component {
	static navigationOptions = {header: null};
	render = () => <Intro content={<AccessButtons {...this.props}/>}/>
}
