import React from "react";
import {Screen} from "../domain/decorators/Screen";
import NavigationBar from "../domain/complex/NavigationBar";
import {IconType} from "../domain/shape/Icon";
import {BottomButton} from "../domain/button/BottomButton";
import {Colors} from "../styles/Colors";

export default class AddJob extends React.Component {
	static navigationOptions = {
		header: null,
	};
	render = () =>
		<Screen backgroundColor={'white'}>
			<NavigationBar
				leftIcon={IconType.BACK_DARK}
				rightIcon={IconType.EMPTY}
				text={"Add Job"}
				leftAction={() => this.props.navigation.goBack()}
			/>

			<Screen/>
			<BottomButton
				backgroundColor={Colors.BLUE} height={70}
				color={Colors.WHITE} fontSize={16} icon={IconType.PLUS_LIGHT}
				action={() => console.log("add")}/>
		</Screen>

}