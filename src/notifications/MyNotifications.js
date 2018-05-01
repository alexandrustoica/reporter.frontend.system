import {IconType} from "../elements/icon/IconType";
import React from "react";
import {SystemIcon} from "../../lib/icon/SystemIcon";
import {store} from "../utils/store";
import {FlatList, StatusBar} from "react-native";
import {Screen} from "../../lib/screen/Screen";
import {NavigationBar} from "../../lib/components/NavigationBar";
import {NotificationAction} from "../service/NotificationEpicAction";
import {ItemNotification, Notification} from "./ItemNotification";


export default class MyNotifications extends React.Component {

    static navigationOptions = {
        header: null,
        drawerIcon: () => <SystemIcon url={IconType.REPORTS_ICON}/>
    };

    constructor(props) {
        super(props)
        const token = store.getState().systemReducer.token
        this.state = {
            token: token,
            state: store.getState().notificationReducer
        }
    }

    __unsubscribeReportsObserver = store.subscribe(() =>
        this.setState({state: store.getState().notificationReducer}))

    componentWillMount = () =>
        store.dispatch(new NotificationAction(this.state.token)
            .getAllAtPage(0))

    componentWillUnmount = () => this.__unsubscribeReportsObserver()

    __getNextPageOfReports = () => {
        const currentPage = this.state.state.page
        if (!this.state.state.isLast && isFinite(currentPage)) {
            store.dispatch(new NotificationAction(this.state.token)
                .getAllAtPage(currentPage + 1))
        }
    }

    __showNewReportsToUserInList = (items) =>
        <FlatList
            data={items}
            onEndReached={() => this.__getNextPageOfReports()}
            keyExtractor={(item, id) => id}
            renderItem={({item}) =>
                <ItemNotification
                    markNotificationAsRead={(id) => {
                        const {token} = store.getState().systemReducer
                        store.dispatch(new NotificationAction(token)
                            .markNotificationAsRead(id))
                    }}
                    item={new Notification(item)}/>}/>

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"My Notifications"}
                leftIcon={IconType.MENU_ICON}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}>
            </NavigationBar>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            {this.__showNewReportsToUserInList(this.state.state.notifications)}
        </Screen>
}
