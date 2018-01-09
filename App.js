import React from "react";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import Welcome from "./src/user/Welcome";
import Register from "./src/user/Register";
import Login from "./src/user/Login";
import Reports from "./src/reports/Reports";
import AddReport from "./src/reports/AddReport";
import Report from "./src/reports/Report";
import Graph from "./src/reports/Graph";


const Nav = StackNavigator({
		Welcome: {screen: Welcome},
		Login: {screen: Login},
		Register: {screen: Register},
		Reports: {screen: Reports},
		AddReport: {screen: AddReport},
		Report: {screen: Report},
        Graph: {screen: Graph},
	},
	{
		headerMode: 'screen'
	});


export default class App extends React.Component {
    render = () => <Nav/>
}

