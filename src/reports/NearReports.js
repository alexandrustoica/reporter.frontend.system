import React from "react";
import {FlatList, StatusBar} from "react-native";
import {Screen} from "../elements/box/screen/Screen";
import {ItemModelAdaptor, ItemReport} from "./ItemReport";
import {NavigationBar} from "../elements/components/NavigationBar";
import moment from "moment/moment";
import {ReportAction} from "../service/ReportEpicActions";
import {store} from "../utils/store";
import {Icon} from "react-native-elements";

export default class NearReports extends React.Component {

    static navigationOptions = {
        header: null,
        title: 'Reports Near Me',
        drawerIcon: () => <Icon name={'near-me'} color={'black'}/>
    };

    constructor(props) {
        super(props)
        const token = store.getState().systemReducer.token
        this.state = {
            token: token,
            reportsReducer: store.getState().reportsReducer
        }
    }

    __saveUserLocationToInternalState = async (location) => {
        store.dispatch(new ReportAction(this.state.token).getAllReportsNear({
            origin: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            radius: 4000.0
        }))
    }

    componentDidMount = async () => {
        await navigator.geolocation.getCurrentPosition(
            (location) => this.__saveUserLocationToInternalState(location),
            (error) => console.log(error),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000})
    }

    __unsubscribeReportObserver = store.subscribe(() =>
        this.setState({reportsReducer: store.getState().reportsReducer}))

    componentWillUnmount = () => this.__unsubscribeReportObserver()

    __adaptToItemView = (data) =>
        new ItemModelAdaptor(data.id, data.title, data.text,
            moment(data.date).fromNow(), data.location, data.type,
            data.photos, data.spam, data.solved)

    __showNewReportsToUserInList = (items) =>
        <FlatList
            data={items}
            keyExtractor={(item, id) => id}
            renderItem={({item}) =>
                <ItemReport {...this.props}
                            item={this.__adaptToItemView(item)}/>}/>

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Near Reports"}
                align={'left'}
                leftIcon={{name: "menu", color: "black"}}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}/>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            {this.__showNewReportsToUserInList(this.state.reportsReducer.reportsNearUserLocation)}
        </Screen>
}

