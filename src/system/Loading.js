import {AsyncStorage, StatusBar} from "react-native";
import {Box} from "../elements/box/Box";
import {Logo} from "../elements/text/Logo";
import * as React from "react";
import {LinearGradient} from "expo";
import {CenterBox} from "../elements/box/CenterBox";
import {webSocketConnection} from "../utils/WebSocketConnection";
import {store} from "../utils/store";
import {SystemAction} from "../service/SystemEpicAction";
import {Screen} from "../elements/box/screen/Screen";

export default class Loading extends React.Component {

    static navigationOptions = {header: null};

    componentWillMount = async () => {
        const username = await AsyncStorage.getItem("username")
        const password = await AsyncStorage.getItem("password")
        // console.log(username)
        // console.log(password)
        if (username === null && password === null) {
            this.__unsubscribe()
            this.props.navigation.navigate('Welcome')
        }
        store.dispatch(SystemAction.login({
            username: username,
            password: password
        }))
    }

    __unsubscribe = store.subscribe(() => {
        const {token} = store.getState().systemReducer
        webSocketConnection.open()
        if (token !== null) {
            this.__unsubscribe()
            this.props.navigation.navigate('MyReports')
        }
    })

    render = () => <Box>
        <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"/>
        <Screen>
            <LinearGradient
                colors={['#171818', '#0b0b0b']}
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    position: 'absolute'
                }}/>
            <CenterBox><Logo/></CenterBox>
        </Screen>
    </Box>
}