import {Logo} from "../elements/text/Logo";
import * as React from "react";
import {Box} from "../elements/box/Box";
import {AsyncStorage, StatusBar} from "react-native";
import {BackgroundScreen} from "../elements/box/screen/BackgroundScreen";
import {Notifications, Permissions} from "expo";
import {AutomaticLogin, Optional} from "./AutomaticLogin";


export default class Intro extends React.Component {


    // TODO: Delete This!
    __loginUserIfPossible = async () => {
        new Optional(await AsyncStorage.getItem('system'))
            .isDefined((system) => new AutomaticLogin(system, this.props.navigation))
            .isNotDefined((error) => console.log(error))
    }
    render = () =>
        <Box>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"/>
            <BackgroundScreen/>
            <Box flexDirection={'column'}
                 alignItems={'center'}
                 justifySelf={'space-around'}>
                <Logo/>
            </Box>
            {this.props.content}
        </Box>

    constructor(props) {
        super(props)
        AsyncStorage.getItem('system').then(it => console.log(it))
    }

    // TODO: Delete This!
    async registerForPushNotifications() {
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (status !== 'granted') {
                return;
            }
        }
        const token = await Notifications.getExpoPushTokenAsync()
        this.subscription = Notifications.addListener(console.log)
        return token
    }
}
