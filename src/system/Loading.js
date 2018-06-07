import {StatusBar} from "react-native";
import {Box} from "../elements/box/Box";
import {Logo} from "../elements/text/Logo";
import * as React from "react";
import {Screen} from "../../lib/screen/Screen";
import {LinearGradient} from "expo";
import {CenterBox} from "../elements/box/CenterBox";
import {webSocketConnection} from "../utils/WebSocketConnection";
import {store} from "../utils/store";
import {SystemAction} from "../service/SystemEpicAction";

export default class Loading extends React.Component {

    static navigationOptions = {header: null};

    componentWillMount = () => store.dispatch(SystemAction.updateToken())

    __isTokenStillValid = (lastUpdatedDate) =>
        ((new Date) - lastUpdatedDate) < 24 * 60 * 60 * 1000

    __unsubscribe = store.subscribe(() => {
        const {token, lastUpdated} = store.getState().systemReducer
        if (token !== undefined &&
            this.__isTokenStillValid(lastUpdated)) {
            this.__unsubscribe()
            webSocketConnection.open()
            this.props.navigation.navigate('MyReports')
        }
        if (token !== undefined &&
            !this.__isTokenStillValid(lastUpdated)) {
            this.__unsubscribe()
            webSocketConnection.open()
            this.props.navigation.navigate('Welcome')
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