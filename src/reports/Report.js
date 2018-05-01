import React from "react";
import {Box} from "../elements/box/Box";
import {IconType} from "../elements/icon/IconType";
import {Screen} from "../elements/box/screen/Screen";
import {ActionButton} from "../elements/components/ActionButton";
import MapView from "react-native-maps";
import {Text} from "react-native";
import {Colors} from "../elements/color/Colors";
import {NavigationBar} from "../elements/components/NavigationBar";
import {ReportAction} from "../service/ReportEpicActions";
import {store} from "../utils/store";


export default class Report extends React.Component {

    static navigationOptions = {header: null};
    __renderMapIfRequested = () =>
        <MapView
            style={{width: "100%", flex: 2}}
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
        this.props.navigation.navigate('Reports')
    }
    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"My Report"}
                align={'left'}
                leftIcon={IconType.BACK_DARK}
                leftAction={() => this.props.navigation.goBack()}/>
            <Box flexDirection={'column'} style={{margin: 20}}>
                <Text style={{fontSize: 45, fontWeight: 'bold'}}>
                    {this.state.item.primaryText}
                </Text>
                <Text style={{marginTop: 10, fontSize: 18}}>
                    {this.state.item.secondaryText}
                </Text>
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
                     height: '56%'
                 }}>
                <ActionButton
                    icon={IconType.DELETE_LIGHT}
                    backgroundColor={Colors.LIGHT_BLUE}
                    onPress={() => this.__onDeleteButtonClick()}/>
            </Box>
        </Screen>

    constructor(props) {
        super(props)
        this.state = {
            token: store.getState().systemReducer.token,
            item: this.props.navigation.state.params.item
        }
    }
}

