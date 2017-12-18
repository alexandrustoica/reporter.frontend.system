import React from "react";
import Login from "./src/component/screen/Login";
import Register from "./src/component/screen/Register";
import Welcome from "./src/component/screen/Welcome";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import AddReport from "./src/component/screen/AddReport";
import Reports from "./src/component/screen/Reports";


const Nav = StackNavigator({
		AddReport: {screen: AddReport},
		Reports: {screen: Reports},
		Welcome: {screen: Welcome},
		Login: {screen: Login},
		Register: {screen: Register},
	},
	{
		headerMode: 'screen'
	});


export default class App extends React.Component {
    render = () => <Nav/>
}

