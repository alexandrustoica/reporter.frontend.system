import React from "react";
import {Box} from "../elements/box/Box";
import {Screen} from "../elements/box/screen/Screen";
import {ActionButton} from "../elements/components/ActionButton";
import MapView from "react-native-maps";
import {StatusBar, Text} from "react-native";
import {Colors} from "../elements/color/Colors";
import {NavigationBar} from "../elements/components/NavigationBar";
import {ReportAction} from "../service/ReportEpicActions";
import {store} from "../utils/store";
import {UserAction} from "../service/UserEpicAction";
import {HBox} from "../elements/box/HBox";
import {Icon} from "react-native-elements";
import {Button} from "../elements/components/Button";


export default class Report extends React.Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props)
        const {reportsReducer, userReducer} = store.getState()
        const {token} = store.getState().systemReducer
        this.state = {
            token: token,
            userReducer: userReducer,
            reportsReducer: reportsReducer,
            item: this.props.navigation.state.params.item
        }
        console.log(this.props.navigation.state.params.item)
    }

    componentWillMount = () => {
        store.dispatch(new UserAction(this.state.token).getCurrentUser())
        store.dispatch(new ReportAction(this.state.token)
            .getReportOwnerUsername(this.state.item.id))
    }

    __unsubscribeCurrentUserObserver = store.subscribe(() => this.setState({
        userReducer: store.getState().userReducer,
        reportsReducer: store.getState().reportsReducer
    }))

    __renderMapIfRequested = () =>
        <MapView style={{width: "100%", flex: 1}}
                 initialRegion={{
                     longitude: this.state.item.location.longitude,
                     latitude: this.state.item.location.latitude,
                     latitudeDelta: 0.5,
                     longitudeDelta: 0.5,
                 }}>
            <MapView.Marker coordinate={{
                longitude: this.state.item.location.longitude,
                latitude: this.state.item.location.latitude,
            }}/>
        </MapView>

    __onDeleteButtonClick = () => {
        store.dispatch(new ReportAction(this.state.token)
            .delete(this.state.item.id))
        this.props.navigation.goBack()
    }

    __isUserOwnerOfTheReport = () => this.state.reportsReducer !== undefined &&
        this.state.userReducer.currentUser.username ===
        this.state.reportsReducer.wantedOwnerUsername.ownerUsername

    __showDeleteButtonIfUserIsOwner = () =>
        this.__isUserOwnerOfTheReport() ? <ActionButton
            icon={{name: 'delete', color: 'white'}}
            backgroundColor={Colors.LIGHT_BLUE}
            onPress={() => this.__onDeleteButtonClick()}/> : null

    __markReportAsSpam = () => {
        store.dispatch(new ReportAction(this.state.token)
            .markReportAsSpam(this.state.item.id))
        this.props.navigation.goBack()
    }

    __markReportAsDone = () => {
        store.dispatch(new ReportAction(this.state.token)
            .markReportAsSolved(this.state.item.id))
        this.props.navigation.goBack()
    }

    __showPoliceControlButtons = () =>
        this.state.userReducer.currentUser.role === 'POLICE' ?
            <HBox height={70} flex={0}>
                <Button
                    backgroundColor={Colors.BLUE}
                    text={"MARK AS SPAM"}
                    height={70}
                    width={'80%'}
                    flex={null}
                    onPress={this.__markReportAsSpam}/>
                <Button
                    icon={{name: 'check', color: 'white'}}
                    backgroundColor={Colors.SUMMER_BLUE}
                    text={""}
                    height={70}
                    width={'20%'}
                    flex={null}
                    onPress={this.__markReportAsDone}/>
            </HBox> : null

    __showIfReportMarked = () => <Text
        style={{color: 'red', marginVertical: 10, fontSize: 18}}>
            {this.state.item.isSpam ? "Report marked as spam!" :
                this.state.item.isSolved ? "Report marked as solved!" : ""}
        </Text>

    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <NavigationBar
                text={"Report"}
                align={'left'}
                rightIcon={{name: 'photo-library', color: 'black'}}
                rightAction={() => this.props.navigation.navigate('ReportGallery',
                    {photos: this.state.item.photos})}
                leftIcon={{name: 'arrow-back', color: 'black'}}
                leftAction={() => this.props.navigation.goBack()}/>
            <Box flexDirection={'column'} style={{margin: 20}}>
                <Text style={{fontSize: 45, fontWeight: 'bold'}}>
                    {this.state.item.title}
                </Text>
                <Text style={{marginTop: 10, fontSize: 18}}>
                    {this.state.item.primaryText}
                </Text>
                {this.__showIfReportMarked()}
                <HBox alignItems={'center'}>
                    <Text
                        style={{marginTop: 10, marginRight: 20, fontSize: 18}}>
                        {this.state.item.secondaryText}
                    </Text>
                    <Icon
                        name={(this.state.item.type === 'PARKING') ? 'local-parking' :
                            (this.state.item.type === 'DUMP') ? 'delete' : 'palette'}
                        color={'#d93c19'}/>
                </HBox>
            </Box>
            {this.state.item.location !== undefined ?
                this.__renderMapIfRequested() : null}
            <Box justifyContent={'flex-end'}
                 alignItems={'flex-end'}
                 pointerEvents={'box-none'}
                 style={{
                     position: 'absolute',
                     margin: -20,
                     width: '100%',
                     height: '65%'
                 }}>
                {this.__showDeleteButtonIfUserIsOwner()}
            </Box>
            {this.__showPoliceControlButtons()}
        </Screen>
}

