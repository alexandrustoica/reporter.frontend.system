import createStore from "redux/es/createStore";
import {NetInfo} from "react-native";
import * as R from "ramda";

export const ConnectionStatus = {
    Offline: 'Offline',
    Online: 'Online'
}

export class ConnectionStatusStore {

    constructor() {
        this.state = {
            status: ConnectionStatus.Online,
        }
        this.reducer = createStore(this.__connectionStatusReducer)
        NetInfo.getConnectionInfo().then(this.__updateConnectionStatus)
        NetInfo.addEventListener('connectionChange', this.__updateConnectionStatus);
    }

    connect = (listener) => this.reducer.subscribe(listener)

    connectionStatus = () => this.state.status

    isOnline = () => R.equals(this.state.status, ConnectionStatus.Online)
    isOffline = () => R.equals(this.state.status, ConnectionStatus.Offline)

    __updateConnectionStatus = (status) =>
        (status.type === 'wifi' || status.type === 'cellular') ?
            this.reducer.dispatch({type: ConnectionStatus.Online}) :
            this.reducer.dispatch({type: ConnectionStatus.Offline})

    __connectionStatusReducer = (state = this.state, action) => ({status: action.type})
}