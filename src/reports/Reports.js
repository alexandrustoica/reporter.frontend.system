import React from "react";
import {AsyncStorage, FlatList, StatusBar} from "react-native";
import {Box} from "../box/Box";
import {IconType} from "../icon/IconType";
import {Screen} from "../screen/Screen";
import {ActionButton} from "../components/ActionButton";
import {ItemModelAdaptor, ItemReport} from "./ItemReport";
import {NavigationBar} from "../components/NavigationBar";
import {SystemIcon} from "../icon/SystemIcon";
import moment from "moment/moment";
import {ReportAction} from "./Actions";
import {store} from "../utils/store";

export default class Reports extends React.Component {

    static navigationOptions = {
        header: null,
        drawerIcon: () => <SystemIcon url={IconType.REPORTS_ICON}/>
    };

    constructor(props) {
        super(props)
        const token = store.getState().systemReducer.token
        this.state = {state: store.getState().reportsReducer}
        store.dispatch(new ReportAction(token).getAllAtPage(0))
    }

    __unsubscribeReportsObserver = store.subscribe(() => {
        console.log(store.getState().reportsReducer)
        this.setState({state: store.getState().reportsReducer})})

    componentWillUnmount = () => this.__unsubscribeReportsObserver()

    __getNextPageOfReports = () => {
        const token = store.getState().systemReducer.token
        const currentPage = this.state.state.page
        if (!this.state.state.isLast && isFinite(currentPage)) {
            store.dispatch(new ReportAction(token)
                .getAllAtPage(currentPage + 1))
        }
    }

    __adaptToItemView = (data) =>
        new ItemModelAdaptor(data.id, data.text,
            moment(data.date).fromNow(), data.location)

    __showNewReportsToUserInList = (items) =>
        <FlatList
            data={items}
            onEndReached={() => this.__getNextPageOfReports()}
            keyExtractor={(item, id) => id}
            renderItem={({item}) =>
                <ItemReport {...this.props}
                            item={this.__adaptToItemView(item)}/>}/>

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Reports"}
                rightIcon={IconType.SEARCH_DARK}
                leftIcon={IconType.MENU_ICON}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}/>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            {this.__showNewReportsToUserInList(this.state.state.reports)}
            <Box justifyContent={'flex-end'}
                 alignItems={'flex-end'}
                 pointerEvents={'box-none'}
                 style={{
                     position: 'absolute',
                     margin: -20,
                     width: '100%',
                     height: '100%'
                 }}>
                <ActionButton onPress={() =>
                    this.props.navigation.navigate('AddReport')}/>
            </Box>
        </Screen>
}

