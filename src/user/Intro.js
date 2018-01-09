import {BackgroundScreen} from "../stateless/other/BackgroundScreen";
import {Logo} from "../stateless/text/Logo";
import * as React from "react";
import {Box} from "../box/Box";


export default class Intro extends React.Component {
	render = () =>
		<Box>
			<BackgroundScreen/>
			<Box flexDirection={'column'}
			     alignItems={'center'}
			     justifySelf={'space-around'}>
				<Logo/>
			</Box>
			{this.props.content}
		</Box>
}
