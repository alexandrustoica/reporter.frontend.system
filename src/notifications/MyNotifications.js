import React from "react";
import {store} from "../utils/store";
import {FlatList, StatusBar} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";
import {NotificationAction} from "../service/NotificationEpicAction";
import {ItemNotification, Notification} from "./ItemNotification";
import {Icon} from "react-native-elements";
import {Screen} from "../elements/box/screen/Screen";


export default class MyNotifications extends React.Component {

    static navigationOptions = {
        header: null,
        title: 'My Notifications',
        drawerIcon: () => <Icon name={'notifications-none'} color={'black'}/>
    };

    constructor(props) {
        super(props)
        this.state = {
            token: store.getState().systemReducer.token,
            notificationReducer: store.getState().notificationReducer
        }
    }

    __unsubscribeReportsObserver = store.subscribe(() =>
        this.setState({notificationReducer: store.getState().notificationReducer}))

    componentWillMount = () =>
        store.dispatch(new NotificationAction(this.state.token).getAllAtPage(0))

    componentWillUnmount = () => this.__unsubscribeReportsObserver()

    __getNextPageOfReports = () => {
        const currentPage = this.state.notificationReducer.page
        if (!this.state.notificationReducer.isLast && isFinite(currentPage)) {
            store.dispatch(new NotificationAction(this.state.token)
                .getAllAtPage(currentPage + 1))
        }
    }

    __showNewReportsToUserInList = (items) =>
        <FlatList
            data={items}
            onEndReached={() => this.__getNextPageOfReports()}
            keyExtractor={(item, id) => id}
            renderItem={({item}) => <ItemNotification
                markNotificationAsRead={(id) =>
                    store.dispatch(new NotificationAction(store.getState().systemReducer.token)
                        .markNotificationAsRead(id))}
                item={new Notification(item)}/>}/>

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"My Notifications"}
                leftIcon={{name: "menu", color: "black"}}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}>
            </NavigationBar>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            {this.__showNewReportsToUserInList(
                this.state.notificationReducer.notifications)}
        </Screen>
}
