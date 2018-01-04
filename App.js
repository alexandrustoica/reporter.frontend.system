import React from "react";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import Welcome from "./src/welcome/Welcome";
import Register from "./src/register/Register";
import Login from "./src/login/Login";
import Reports from "./src/reports/Reports";


const Nav = StackNavigator({
		Reports: {screen: Reports},
		Welcome: {screen: Welcome},
		Register: {screen: Register},
		Login: {screen: Login},
		// AddReport: {screen: AddReport},
	},
	{
		headerMode: 'screen'
	});


export default class App extends React.Component {
    render = () => <Nav/>
}

