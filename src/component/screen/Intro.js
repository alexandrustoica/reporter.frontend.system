import {Logo} from "../../stateless/text/Logo";
import * as React from "react";
import {BackgroundScreen} from "../../stateless/other/BackgroundScreen";
import {CenterContainer} from "../../stateless/container/CenterContainer";


export default class Intro extends React.Component {

	render = () =>
		<CenterContainer>
			<BackgroundScreen/>
			<CenterContainer>
				<Logo/>
			</CenterContainer>
			{this.props.content}
		</CenterContainer>
}
