import React from "react";
import {Screen} from "../elements/box/screen/Screen";
import MapView, {Circle} from "react-native-maps";
import {NavigationBar} from "../elements/components/NavigationBar";
import {store} from "../utils/store";
import {ReportAction} from "../service/ReportEpicActions";
import * as R from "ramda";
import {Icon} from "react-native-elements";
import {StatusBar} from "react-native";


export default class Map extends React.Component {

    static navigationOptions = {
        header: null,
        drawerIcon: () => <Icon name={'map'} color={'black'}/>
    };

    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 0.0,
                longitude: 0.0,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },
            token: store.getState().systemReducer.token,
            reportsReducer: {
                reportsNearUserLocation: [],
                criticalSectionsNearUserLocation: []
            }
        }
    }

    __unsubscribeReportObserver = store.subscribe(() =>
        this.setState({reportsReducer: store.getState().reportsReducer}))

    __saveUserLocationToInternalState = async (location) => {
        store.dispatch(new ReportAction(this.state.token).getAllReportsNear({
            origin: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            radius: 4000.0
        }))
        store.dispatch(new ReportAction(this.state.token).getAllCriticalSectionsNear({
            origin: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            radius: 4000.0
        }))
        await this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        })
    }

    componentDidMount = async () => {
        await navigator.geolocation.getCurrentPosition(
            (location) => this.__saveUserLocationToInternalState(location),
            // TODO: Error To User
            (error) => console.log(error),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000})
    }

    __showReportOnMap = (report) =>
        <MapView.Marker coordinate={{
            longitude: report.location.longitude,
            latitude: report.location.latitude,
        }}/>

    __showCriticalSectionOnMap = (criticalSection) =>
        <Circle center={{
            longitude: criticalSection.origin.longitude,
            latitude: criticalSection.origin.latitude
        }}
                radius={criticalSection.radius}
                fillColor={"rgba(232, 69, 69, 0.3)"}/>

    __showReportsOnMap = () =>
        R.map(this.__showReportOnMap,
            this.state.reportsReducer.reportsNearUserLocation)

    __showCriticalSectionsOnMap = () =>
        R.map(this.__showCriticalSectionOnMap,
            this.state.reportsReducer.criticalSectionsNearUserLocation)

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Map"}
                align={'left'}
                leftIcon={{name: "menu", color: "black"}}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}/>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <MapView
                style={{
                    width: "100%",
                    height: '100%',
                    position: 'absolute',
                    zIndex: -1
                }}
                showsUserLocation={true}
                scrollEnabled={true}
                zoomEnabled={true}
                followsUserLocation={true}
                onRegionChange={(region) => this.setState({region})}
                initialRegion={this.state.region}>
                {this.__showReportsOnMap()}
                {this.__showCriticalSectionsOnMap()}
            </MapView>
        </Screen>
}

