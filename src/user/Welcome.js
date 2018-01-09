import React from "react";
import Intro from "./Intro";
import {Box} from "../box/Box";
import {Colors} from "../color/Colors";
import {HBox} from "../box/HBox";
import {Button} from "../components/Button";
import {UserLocalRepository} from "./UserLocalRepository";


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

	componentWillMount = async() => {
		status = await new UserLocalRepository().getToken()
        if(await new UserLocalRepository().getToken() != null)
            this.props.navigation.navigate('Reports')
	}

	render = () => <Intro content={<AccessButtons {...this.props}/>}/>
}
