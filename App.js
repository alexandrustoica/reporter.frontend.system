import React from "react";
import Welcome from "./src/system/Welcome";
import Register, {LoginAfterRegister} from "./src/system/Register";
import Login from "./src/system/Login";
import Logout from "./src/system/Logout";
import AddReport from "./src/reports/AddReport";
import Report from "./src/reports/Report";
import Graph from "./src/reports/Graph";
import {DrawerNavigator, StackNavigator} from "react-navigation";
import Reports from "./src/reports/Reports";
import {RCamera} from "./src/reports/RCamera";

const ReportsWithDrawer = DrawerNavigator({
    Reports: {screen: Reports},
    Stats: {screen: Graph},
    Logout: {screen: Logout},
});

const Nav = StackNavigator({
        Welcome: {screen: Welcome},
        Login: {screen: Login},
        Register: {screen: Register},
        LoginAfterRegister: {screen: LoginAfterRegister},
        Reports: {
            screen: ReportsWithDrawer,
            navigationOptions: {
                header: false
            }
        },
        AddReport: {screen: AddReport},
        RCamera: {screen: RCamera},
        Report: {screen: Report},
        Graph: {screen: Graph},
    },
    {
        headerMode: 'screen'
    });

export default class App extends React.Component {
    render = () => <Nav/>
}

