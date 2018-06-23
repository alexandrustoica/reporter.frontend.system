import React from "react";
import {Screen} from "../elements/box/screen/Screen";
import MapView from "react-native-maps";
import {Circle} from "react-native-maps";
import {NavigationBar} from "../elements/components/NavigationBar";
import {store} from "../utils/store";
import {ReportAction} from "../service/ReportEpicActions";
import * as R from "ramda";
import {Icon} from "react-native-elements";
import {FlatList, Image, StatusBar, Text, TouchableOpacity} from "react-native";
import {Colors} from "../elements/color/Colors";
import {Box} from "../elements/box/Box";
import {HBox} from "../elements/box/HBox";
import {CenterBox} from "../elements/box/CenterBox";
import {__getStatusColorAndIcon, ItemModelAdaptor} from "./ItemReport";
import moment from "moment/moment";

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

    componentWillUnmount = () => this.__unsubscribeReportObserver()

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
        this.setState({
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
            (error) => console.log(error),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000})
    }

    __showReportOnMap = (report) =>
        <MapView.Marker.Animated
            key={report.id}
            coordinate={{
                longitude: report.location.longitude,
                latitude: report.location.latitude,
            }}/>

    __showCriticalSectionOnMap = (criticalSection) =>
        <Circle
            key={criticalSection.id}
            center={{
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
    __adaptToItemView = (data) =>
        new ItemModelAdaptor(data.id, data.title, data.text,
            moment(data.date).fromNow(), data.location, data.type,
            data.photos, data.spam, data.solved)
    __showReportCards = () =>
        <Box justifyContent={'flex-end'}
             alignItems={'flex-end'}
             pointerEvents={'box-none'}
             style={{
                 position: 'absolute',
                 width: '100%',
                 height: '100%'
             }}>
            <HBox height={140} alignSelf={'flex-end'} flex={null}>
                <FlatList
                    horizontal={true}
                    ref={(ref) => {
                        this.reportsList = ref
                    }}
                    data={this.state.reportsReducer.reportsNearUserLocation}
                    viewabilityConfig={{
                        waitForInteraction: true,
                        viewAreaCoveragePercentThreshold: 40
                    }}
                    onViewableItemsChanged={(data) => {
                        this.reportsList !== null ?
                            this.reportsList.scrollToIndex({
                                animated: true,
                                index: data.viewableItems[0].index
                            }) : ""
                        return this.map !== null ?
                            this.map.animateToCoordinate(
                                data.viewableItems[0].item.location, 500) : ""
                    }}
                    keyExtractor={(item, id) => id}
                    renderItem={({item}) =>
                        <CardReport {...this.props}
                                    item={this.__adaptToItemView(item)}/>}/>
            </HBox>
        </Box>

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
                ref={map => {
                    this.map = map
                }}
                showsUserLocation={true}
                scrollEnabled={true}
                zoomEnabled={true}
                onRegionChangeComplete={(region) => this.setState({region: region})}
                initialRegion={this.state.region}>
                {this.__showReportsOnMap()}
                {this.__showCriticalSectionsOnMap()}
            </MapView>
            {this.__showReportCards()}
        </Screen>
}

const CardStyle = {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: Colors.BLUE,
    shadowOffset: {
        width: 0,
        height: 10
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    borderRadius: 10,
    width: 220,
    height: 120,
    backgroundColor: Colors.WHITE,
}

const TitleStyle = {
    paddingHorizontal: 15,
    width: '50%',
    fontSize: 18,
    fontWeight: 'bold'
}

const ImageStyle = {
    width: 100,
    height: 100,
    borderRadius: 10,
}

const CardReport = (props) =>
    <TouchableOpacity
        activeOpacity={1.0}
        onPress={() =>
            props.navigation.navigate('Report', {item: props.item})}
        style={CardStyle}>
        <HBox style={{padding: 10}} alignItems={'center'}>
            <Image style={ImageStyle}
                   source={{uri: `data:image/png;base64, ${props.item.photos[0].bytes}`}}>
                <CenterBox>
                    <Icon containerStyle={{
                        width: 40, height: 40,
                        backgroundColor: __getStatusColorAndIcon(props.item).color,
                        borderRadius: 20
                    }}
                          name={__getStatusColorAndIcon(props.item).icon}
                          color={'white'}/>
                </CenterBox>
            </Image>
            <Text style={TitleStyle}>{props.item.title}</Text>
        </HBox>
    </TouchableOpacity>

