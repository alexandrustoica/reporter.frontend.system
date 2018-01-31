import React from "react";
import {FlatList, StatusBar} from "react-native";
import {Box} from "../box/Box";
import * as R from "ramda";
import createStore from "redux/es/createStore";
import {IconType} from "../icon/IconType";
import {Screen} from "../screen/Screen";
import {ActionButton} from "../components/ActionButton";
import {ItemModelAdaptor, ItemReport} from "./ItemReport";
import {UserLocalRepository} from "../repository/UserLocalRepository";
import {NavigationBar} from "../components/NavigationBar";
import {SystemIcon} from "../icon/SystemIcon";
import {OfflineService} from "../repository/ReportLocalRepository";
import moment from "moment/moment";
import {Controller} from "../repository/Controller";

export default class Reports extends React.Component {

    static navigationOptions = {
        header: null,
        drawerIcon: () => (
            <SystemIcon url={IconType.REPORTS_ICON}/>
        )
    };

    constructor(props) {
        super(props)
        this.state = {
            controller: new Controller(),
            reports: [],
            store: createStore(this.__updateReportsFromServer),
        }
        console.log(this.state.controller)
        this.state.store.subscribe(this.render)
    }

    componentWillMount = async () => {
        await this.setState({reports: await this.state.controller.getAll()})
    }

    componentWillUnmount = async () => {
        await this.setState({reports: []})
    }

    __updateReportsFromStateOnlyIfNeeded = (lastReports, newReports) =>
        R.concat(lastReports,
            R.filter(it => !R.contains(it, lastReports), newReports))

    __updateReportAction = async (data) =>
        await this.setState((lastState) => {
            return {
                reports: this.__updateReportsFromStateOnlyIfNeeded(
                    lastState.reports, data)
            }
        })

    __updateReportsFromServer = async (state = this.state, action) => {
        return (action.type === "UPDATE_REPORTS") ?
            this.__updateReportAction(action.data) : state
    }

    __signalNeedToUpdateReports = async () =>
        this.state.store.dispatch({
            type: "UPDATE_REPORTS",
            data: await this.state.controller.getAll()
        })

    __adaptToItemView = (data) =>
        new ItemModelAdaptor(data.id, data.text,
            moment(data.date).fromNow(), data.location)

    __showNewReportsToUserInList = (items) =>
        <FlatList
            data={items}
            onEndReached={() => this.__signalNeedToUpdateReports()}
            keyExtractor={(item, id) => id}
            renderItem={({item}) =>
                <ItemReport {...this.props}
                            item={this.__adaptToItemView(item)}/>}/>

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Reports"}
                rightIcon={IconType.SEARCH_DARK}
                rightAction={async () => console.log(await new Controller())}
                leftIcon={IconType.MENU_ICON}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}/>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            {this.__showNewReportsToUserInList(this.state.reports)}
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

