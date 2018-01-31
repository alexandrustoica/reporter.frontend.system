import React from "react";
import {FlatList, StatusBar} from "react-native";
import {Box} from "../box/Box";
import * as R from "ramda";
import createStore from "redux/es/createStore";
import {IconType} from "../icon/IconType";
import {Screen} from "../screen/Screen";
import {ActionButton} from "../components/ActionButton";
import {ItemModelAdaptor, ItemReport} from "./ItemReport";
import {NavigationBar} from "../components/NavigationBar";
import {SystemIcon} from "../icon/SystemIcon";
import {OfflineService} from "../repository/ReportLocalRepository";
import moment from "moment/moment";
import {Controller} from "../repository/Controller";
import {ConnectionStatusStore} from "../repository/ConnectionStatus";
import {BarMessage} from "../components/BarMessage";
import {TaskController} from "../data/TaskController";


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
            controller: new TaskController(),
            tasks: [],
            connection: new ConnectionStatusStore()
        }
        this.state.controller.updateDataFromRemoteLocation()
        this.state.controller.connectToLocalStorage(
            this.onUpdateFromController)
    }

    onUpdateFromController = (data) => {
        this.setState({
            tasks: R.filter(it => R.equals(it.status, 'active'), data)
        })
    }

    componentWillMount = async () =>
        await this.onUpdateFromController(await this.state.controller.getAllFromLocalStorage())

    componentWillUnmount = async () =>
        await this.setState({tasks: []})

    __adaptToItemView = (data) =>
        new ItemModelAdaptor(data.id, data.text,
            moment(data.updated).fromNow())

    __showNewReportsToUserInList = (items) =>
        <FlatList
            data={items}
            //onEndReached={() => this.__signalNeedToUpdateReports()}
            keyExtractor={(item, id) => id}
            renderItem={({item}) =>
                <ItemReport {...this.props}
                            item={this.__adaptToItemView(item)}/>}/>

    __showOfflineBarMessage = () => <BarMessage/>

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
            {this.state.connection.isOffline() ? this.__showOfflineBarMessage() : null}
            {this.__showNewReportsToUserInList(this.state.tasks)}
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

