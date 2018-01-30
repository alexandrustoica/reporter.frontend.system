import React from "react";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
import Welcome from "./src/user/Welcome";
import Register from "./src/user/Register";
import Login from "./src/user/Login";
import Logout from "./src/user/Logout";
import AddReport from "./src/reports/AddReport";
import Report from "./src/reports/Report";
import Graph from "./src/reports/Graph";
import {DrawerNavigator} from "react-navigation";
import Reports from "./src/reports/Reports";

const ReportsWithDrawer = DrawerNavigator({
    Reports: {screen: Reports},
    Stats: {screen: Graph},
    Logout: {screen: Logout},
});

const Nav = StackNavigator({
        Welcome: {screen: Welcome},
        Login: {screen: Login},
        Register: {screen: Register},
        Reports: {
            screen: ReportsWithDrawer,
            navigationOptions: {
                header: false
            }
        },
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

