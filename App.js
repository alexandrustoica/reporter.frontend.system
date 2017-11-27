import React from "react";
import Login from "./src/component/screen/Login";
import SignUp from "./src/component/screen/SignUp";
import Welcome from "./src/component/screen/Welcome";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import Tasks from "./src/component/screen/Tasks";

const Nav = StackNavigator({
        Welcome: {screen: Welcome},
        Login: {screen: Login},
        SignUp: {screen: SignUp},
        Tasks: {screen: Tasks},
    },
    {
        headerMode: 'screen'
    });


export default class App extends React.Component {
    render = () => <Nav/>
}

