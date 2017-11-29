import React from "react";
import {IconType} from "../domain/shape/Icon";
import TopBarNavigation from "../domain/complex/NavigationBar";
import {Colors} from "../styles/Colors";
import {EmptyListDisplayed} from "../domain/list/EmptyListDisplayer";
import {ActionButton} from "../domain/button/ActionButton";
import {Screen} from "../domain/decorators/Screen";


export default class Jobs extends React.Component {
	static navigationOptions = {
		header: null,
	};
	render = () =>
		<Screen backgroundColor={'white'}>
			<TopBarNavigation
				leftIcon={IconType.PROFILE_DARK}
				rightIcon={IconType.SEARCH_DARK}
				text={"Jobs"}/>
			<EmptyListDisplayed
				cause={'You don\'t have any jobs published.'}
				solution={'Please add a job to get started.'}/>
			<ActionButton icon={IconType.PLUS_LIGHT}
			              color={Colors.BLUE}
			              onPress={() => this.props.navigation.navigate('AddJob')}/>
		</Screen>
}

