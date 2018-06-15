import React from "react";
import {FlatList, StatusBar} from "react-native";
import {Box} from "../elements/box/Box";
import {Screen} from "../elements/box/screen/Screen";
import {ActionButton} from "../elements/components/ActionButton";
import {ItemModelAdaptor, ItemReport} from "./ItemReport";
import {NavigationBar} from "../elements/components/NavigationBar";
import moment from "moment/moment";
import {ReportAction} from "../service/ReportEpicActions";
import {store} from "../utils/store";
import {Icon} from "react-native-elements";
import StatusBarAlert from "react-native-statusbar-alert";

export default class MyReports extends React.Component {

    static navigationOptions = {
        header: null,
        title: 'My Reports',
        drawerIcon: () => <Icon name={'filter-none'} color={'black'}/>
    };

    constructor(props) {
        super(props)
        const token = store.getState().systemReducer.token
        this.state = {
            token: token,
            state: store.getState().reportsReducer,
        }
    }

    componentWillMount = () => {
        store.dispatch(new ReportAction(this.state.token).getAllAtPage(0))
    }

    __unsubscribeReportsObserver = store.subscribe(() => {
        this.setState({state: store.getState().reportsReducer})
    })

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
        new ItemModelAdaptor(data.id, data.title, data.text,
            moment(data.date).fromNow(), data.location, data.type,
            data.photos, data.spam, data.solved)

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
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>

            <StatusBarAlert
                visible={true}
                height={30}
                message="Silent Switch ON"
                backgroundColor="#3CC29E"
                color="white"/>

            <NavigationBar
                text={"My Reports"}
                leftIcon={{name: "menu", color: "black"}}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}/>
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

