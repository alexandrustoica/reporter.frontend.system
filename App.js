import React from "react";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import Welcome from "./src/welcome/Welcome";
import Register from "./src/register/Register";
import Login from "./src/login/Login";
import Reports from "./src/reports/Reports";
import AddReport from "./src/reports/AddReport";
import Report from "./src/reports/Report";
import Graph from "./src/reports/Graph";


const Nav = StackNavigator({
		Reports: {screen: Reports},
		AddReport: {screen: AddReport},
		Report: {screen: Report},
        Graph: {screen: Graph},
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

