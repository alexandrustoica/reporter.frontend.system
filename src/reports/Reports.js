import React from "react";
import {FlatList} from "react-native"
import {ReportService} from "./ReportService";
import {Box} from "../box/Box";
import * as R from "ramda";
import createStore from "redux/es/createStore";
import NavigationBar from "../stateless/complex/NavigationBar";
import {IconType} from "../icon/Icon";
import {Screen} from "../stateless/decorators/Screen";
import {ActionButton} from "../components/ActionButton";
import {ItemReport} from "./ItemReport";

export default class Reports extends React.Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props)
        this.state = {
            service: new ReportService(),
            reports: [],
            store: createStore(this.__updateReportsFromServer)
        }
        this.state.store.subscribe(this.render)
    }

    componentWillMount = async () =>
        await this.setState({reports: await this.state.service.reports()})


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

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Reports"}
                leftIcon={IconType.PROFILE_DARK}
                leftAction={() => this.props.navigation.navigate('Welcome')}
                rightIcon={IconType.TIME_DARK}
                rightAction={() => this.props.navigation.navigate('Graph')}/>
            {this.__showNewReportsToUserInList(this.state.reports)}
            <Box justifyContent={'flex-end'}
                 alignItems={'flex-end'}
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

