import React from "react";
import {IconType} from "../elements/icon/IconType";
import {SystemIcon} from "../elements/icon/SystemIcon";
import {Text, View} from "react-native";

export default class Logout extends React.Component {

    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = {
        header: null,
        drawerIcon: () => (
            <SystemIcon url={IconType.LOGOUT_ICON}/>
        )
    };

    componentWillMount = () => {
        this.__logoutUserFromCurrentSession()
    }

    __logoutUserFromCurrentSession = () => {
        // TODO Logout
        this.props.navigation.navigate('Welcome')
    }

    render = () => <View>
        <Text>
            Have a great day!
        </Text>
    </View>
}
