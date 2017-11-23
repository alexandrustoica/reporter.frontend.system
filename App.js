import React from "react";
import Login from "./component/screen/Login";
import SignUp from "./component/screen/SignUp";
import Welcome from "./component/screen/Welcome";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import Tasks from "./component/screen/Tasks";

const Nav = StackNavigator({
        Tasks: {screen: Tasks},
        Welcome: {screen: Welcome},
        Login: {screen: Login},
        SignUp: {screen: SignUp}},
    {
        headerMode: 'screen'
    });


export default class App extends React.Component {
    render = () => <Nav/>
}

