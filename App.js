import React from "react";
import Welcome from "./src/system/Welcome";
import Register, {LoginAfterRegister} from "./src/system/Register";
import Login from "./src/system/Login";
import Logout from "./src/system/Logout";
import AddReport from "./src/reports/AddReport";
import Report from "./src/reports/Report";
import {DrawerNavigator, StackNavigator} from "react-navigation";
import {RCamera} from "./src/reports/RCamera";
import MyNotifications from "./src/notifications/MyNotifications";
import MyProfile from "./src/user/MyProfile";
import EditProfile from "./src/user/EditProfile";
import Map from "./src/reports/Map";
import MyReports from "./src/reports/MyReports";
import NearReports from "./src/reports/NearReports";
import Loading from "./src/system/Loading";

const ReportsWithDrawer = DrawerNavigator({
    MyReports: {screen: MyReports},
    NearReports: {screen: NearReports},
    MyNotifications: {screen: MyNotifications},
    MyProfile: {screen: MyProfile},
    Map: {screen: Map},
    Logout: {screen: Logout},
});

const Nav = StackNavigator({
    Loading: {screen: Loading},
    Welcome: {screen: Welcome},
    Login: {screen: Login},
    Register: {screen: Register},
    LoginAfterRegister: {screen: LoginAfterRegister},
    MyReports: {
        screen: ReportsWithDrawer,
        navigationOptions: {
            header: false
        }
    },
    AddReport: {screen: AddReport},
    RCamera: {screen: RCamera},
    Report: {screen: Report},
    EditProfile: {screen: EditProfile}
}, {
    headerMode: 'screen'
});

export default class App extends React.Component {
    render = () =>
        <Nav/>
}

