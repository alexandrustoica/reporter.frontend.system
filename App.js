import React from 'react';
import Login from "./component/screen/Login";
import TabNavigator from "./node_modules/react-navigation/lib-rn/navigators/TabNavigator";
import SignUp from "./component/screen/SignUp";
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
	navigationBar: {
		borderTopWidth: 24,
		backgroundColor: 'black',
	},
	indicator: {
		backgroundColor: '#97CBF1',
		width: 30,
		marginLeft: '15%',
	}
})

const Nav = TabNavigator({
		Login: {screen: Login},
		SignUp: {screen: SignUp}
	},
	{
		tabBarOptions: {
			style: style.navigationBar,
			indicatorStyle: style.indicator
		}
	})

export default class App extends React.Component {
	render = () => <Nav/>
}

