import React from "react";
import {Screen} from "../stateless/decorators/Screen";
import NavigationBar from "../stateless/complex/NavigationBar";
import {IconType} from "../icon/Icon";
import {BottomButton} from "../stateless/button/BottomButton";
import {Colors} from "../stateless/color/Colors";
import {ReportService} from "./ReportService";
import {TextField} from "../stateless/complex/TextField";

export default class AddReport extends React.Component {

	constructor(props) {
		super(props)
		this.state = {text: "", service: new ReportService()}
	}

	static navigationOptions = {
		header: null,
	};

	_createReport = () =>
		({id: 0, location: {latitude: 10, longitude: 10}, text: this.state.text})

	render = () =>
		<Screen backgroundColor={'white'}>
			<NavigationBar
				leftIcon={IconType.BACK_DARK}
				text={"Add Report"}
				leftAction={() => this.props.navigation.goBack()}/>
			<TextField input={"Write a description for your report ..."}
			           onChangeText={(text) => this.state.text = text}/>
			<Screen/>
			<BottomButton
				backgroundColor={Colors.BLUE} height={70}
				color={Colors.WHITE}
				fontSize={16}
				icon={IconType.PLUS_LIGHT}
				action={async () => (await this.state.service.insert(this._createReport())) !== 'undefined'? this.props.navigation.navigate('Reports'): null}/>
		</Screen>

}