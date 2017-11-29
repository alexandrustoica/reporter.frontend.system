import React from "react";
import Login from "./src/component/screen/Login";
import Register from "./src/component/screen/Register";
import Welcome from "./src/component/screen/Welcome";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import Jobs from "./src/component/screen/Jobs";
import AddJob from "./src/component/screen/AddJob";

const Nav = StackNavigator({
		Welcome: {screen: Welcome},
		Login: {screen: Login},
		Register: {screen: Register},
		Jobs: {screen: Jobs},
		AddJob: {screen: AddJob},
    },
    {
        headerMode: 'screen'
    });


export default class App extends React.Component {
    render = () => <Nav/>
}

