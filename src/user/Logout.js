import React from "react";
import {UserLocalRepository} from "../repository/UserLocalRepository";
import {IconType} from "../icon/IconType";
import {SystemIcon} from "../icon/SystemIcon";
import {Text, View} from "react-native";

export default class Logout extends React.Component {

    static navigationOptions = {
        header: null,
        drawerIcon: ({tintColor}) => (
            <SystemIcon url={IconType.LOGOUT_ICON}/>
        )
    };

    componentWillMount = () => {
        this.__logoutUserFromCurrentSession()
    }

    __logoutUserFromCurrentSession = () => {
        new UserLocalRepository().logout()
        this.props.navigation.navigate('Welcome')
    }

    render = () => <View>
        <Text>
           Have a great day!
        </Text>
    </View>
}
