import {Logo} from "../text/Logo";
import * as React from "react";
import {Box} from "../box/Box";
import {StatusBar} from "react-native";
import {BackgroundScreen} from "../screen/BackgroundScreen";
import {AsyncStorage} from 'react-native'
import {AutomaticLogin, Optional} from "./Login";
import SockJS from "sockjs-client"
import Stomp from "stompjs";
import {Endpoint} from "../service/Endpoint";


export default class Intro extends React.Component {

    __loginUserIfPossible = () => {
        Optional(AsyncStorage.getItem('system'))
            .isDefined((system) => new AutomaticLogin(system, this.props.navigation))
            .isNotDefined((error) => console.log(error))
    }

    constructor(props) {
        super(props)
        // const socket = new SockJS(Endpoint.WS)
        // const stomp = Stomp.over(socket)
        // stomp.connect({}, () => stomp.subscribe("/app/notifications",
        //     (message) => console.log(message)))
    }

    render = () =>
        <Box>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <BackgroundScreen/>
            <Box flexDirection={'column'}
                 alignItems={'center'}
                 justifySelf={'space-around'}>
                <Logo/>
            </Box>
            {this.props.content}
        </Box>
}
