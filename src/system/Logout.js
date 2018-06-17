import React from "react";
import {AsyncStorage, Text, View} from "react-native";
import {webSocketConnection} from "../utils/WebSocketConnection";
import {Icon} from "react-native-elements";


export default class Logout extends React.Component {

    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = {
        header: null,
        drawerIcon: () => <Icon name={'exit-to-app'} color={'black'}/>
    };

    componentWillMount = () => this.__logoutUserFromCurrentSession()

    __logoutUserFromCurrentSession = () => {
        webSocketConnection.close()
        AsyncStorage.removeItem('username')
        AsyncStorage.removeItem('password')
        this.props.navigation.navigate('Welcome')
    }

    render = () => <View><Text>Have a great day!</Text></View>
}
