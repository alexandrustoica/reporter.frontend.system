import {FlatList, StatusBar, Text} from "react-native";
import React from "react";
import {IconType} from "../domain/shape/Icon";
import TopBarNavigation from "../domain/complex/NavigationBar";
import {COLOR_BLUE} from "../styles/Colors";
import {EmptyListDisplayed} from "../domain/list/EmptyListDisplayer";
import {ActionButton} from "../domain/button/ActionButton";
import {Screen} from "../domain/decorators/Screen";
import {Header} from "react-navigation";

export default class Tasks extends React.Component {
	static navigationOptions = {
		header: null,
	};
	render = () =>
		<Screen backgroundColor={'white'}>
			<TopBarNavigation
				leftIcon={IconType.PROFILE_DARK}
				rightIcon={IconType.SEARCH_DARK}
				text={"Tasks"}/>
			<EmptyListDisplayed
				cause={'You don\'t have any tasks to work on.'}
				solution={'Please add a task to get started.'}/>
			{/*<FlatList data={[]}*/}
			          {/*renderItem={({item}) => <Text>{item.key}</Text>}/>*/}
			<ActionButton icon={IconType.PLUS_LIGHT}
			              color={COLOR_BLUE}/>
		</Screen>
}

