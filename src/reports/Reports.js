import React from "react";
import {FlatList, StatusBar} from "react-native"
import {ReportService} from "../service/ReportService";
import {Box} from "../box/Box";
import * as R from "ramda";
import createStore from "redux/es/createStore";
import {IconType} from "../icon/IconType";
import {Screen} from "../screen/Screen";
import {ActionButton} from "../components/ActionButton";
import {ItemReport} from "./ItemReport";
import {UserLocalRepository} from "../repository/UserLocalRepository";
import {NavigationBar} from "../components/NavigationBar";
import {SystemIcon} from "../icon/SystemIcon";

export default class Reports extends React.Component {

    static navigationOptions = {
        header: null,
        drawerIcon: ({ tintColor }) => (
            <SystemIcon url={IconType.REPORTS_ICON}/>
        )
    };

    constructor(props) {
        super(props)
        this.state = {
            service: new ReportService(),
            reports: [],
            store: createStore(this.__updateReportsFromServer)
        }
        this.state.store.subscribe(this.render)
    }

    componentWillMount = async () => {
        await this.setState({reports: await this.state.service.reports()})
    }

    componentWillUnmount = async () => {
        await this.setState({reports: []})
    }

    __update_report_action = async (data) =>
        await this.setState((lastState) => {
            return {
                reports: R.concat(lastState.reports,
                    R.forEach(console.log, data))
            }
        })

    __updateReportsFromServer = async (state = this.state, action) => {
        return (action.type === "UPDATE_REPORTS") ?
            this.__update_report_action(action.data) : null
    }

    __signalNeedToUpdateReports = async () =>
        this.state.store.dispatch({
            type: "UPDATE_REPORTS",
            data: await this.state.service.reports()
        })

    __showNewReportsToUserInList = (items) =>
        <FlatList data={items}
                  onEndReached={() => this.__signalNeedToUpdateReports()}
                  keyExtractor={(item, id) => id}
                  renderItem={({item}) =>
                      <ItemReport {...this.props} report={item}/>}/>

    __logoutUserFromCurrentSession = () => {
        new UserLocalRepository().logout()
        this.props.navigation.navigate('Welcome')
    }

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Reports"}
                rightIcon={IconType.STATS_ICON}
                rightAction={() => this.props.navigation.navigate('Graph')}
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

