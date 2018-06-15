import React from "react";
import {EditText} from "../elements/components/EditText";
import MapView from "react-native-maps";
import {Button} from "../elements/components/Button";
import {Colors} from "../elements/color/Colors";
import * as R from "ramda";
import {NavigationBar} from "../elements/components/NavigationBar";
import {Screen} from "../elements/box/screen/Screen";
import {ReportAction} from "../service/ReportEpicActions";
import {store} from "../utils/store";
import {Image, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {HBox} from "../elements/box/HBox";
import RNPickerSelect from "react-native-picker-select";
import {ImagePicker} from 'expo';

export class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class Photo {
    constructor(bytes) {
        this.bytes = bytes
    }
}

export class Report {
    constructor(title, text, location, photos, type) {
        this.text = text;
        this.title = title;
        this.photos = photos;
        this.location = location;
        this.type = type;
    }
}

export default class AddReport extends React.Component {

    static navigationOptions = {header: null}

    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            title: '',
            text: '',
            region: {
                latitude: 0.0,
                longitude: 0.0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        }
    }

    __saveUserLocationToInternalState = async (location) =>
        await this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            type: "PARKING"
        })

    __unsubscribePhotosObserver = store.subscribe(() =>
        this.setState({photos: store.getState().reportsReducer.photos}))

    __getReportFromCurrentUserData = () => new Report(
        this.state.title, this.state.text,
        new Location(this.state.region.latitude, this.state.region.longitude),
        this.state.photos.map(it => it.base64).map(it => new Photo(it)),
        this.state.type)

    __saveNewReport = (report) => {
        const token = store.getState().systemReducer.token;
        store.dispatch(new ReportAction(token).create(report))
    }

    __goToReportsScreen = () =>
        this.props.navigation.navigate('MyReports')

    __saveReportAndGoBackToReportsScreen = (report) =>
        R.compose(this.__goToReportsScreen,
            this.__saveNewReport)(report)

    componentDidMount = async () => {
        await navigator.geolocation.getCurrentPosition(
            (location) => this.__saveUserLocationToInternalState(location),
            // TODO: Error To User
            (error) => console.log(error),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000})
    }

    __renderPhotoFromUser = (photo) => {
        console.log(photo)
        return (

        <View style={{width: '50%'}}>
            <Image style={{height: 200}} source={{uri: photo.uri}}/>
        </View>
    )}
    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <ScrollView style={{flex: 1}}>
                <NavigationBar
                    text={"Add Report"}
                    align={'left'}
                    leftIcon={{name: 'arrow-back', color: 'black'}}
                    leftAction={() => this.props.navigation.goBack()}/>
                <EditText
                    flex={1}
                    fontSize={20}
                    text={"Write a title for your report..."}
                    onChangeText={(text) => this.setState({title: text})}/>
                <RNPickerSelect
                    placeholder={{label: 'Parking', value: "PARKING",}}
                    style={{...pickerSelectStyles}}
                    items={[{label: 'Dumps', value: 'DUMP'},
                        {label: 'Graffiti', value: 'GRAFFITI'}]}
                    onValueChange={(value) => this.setState({type: value})}
                    value={this.state.type}/>
                <EditText
                    flex={1}
                    fontSize={14}
                    text={"Write a short description for your report ..."}
                    onChangeText={(text) => this.setState({text: text})}/>
                <MapView
                    style={{width: "100%", height: 252}}
                    showsUserLocation={true}
                    scrollEnabled={false}
                    region={this.state.region}
                    onRegionChange={(region) => this.setState({region})}>
                    <MapView.Marker coordinate={{
                        longitude: this.state.region.longitude,
                        latitude: this.state.region.latitude,
                    }}/>
                </MapView>
                <HBox width={'100%'} style={{flexWrap: 'wrap'}}>
                    {this.state.photos.map(this.__renderPhotoFromUser)}
                </HBox>
                <HBox height={70} flex={0}>
                    <Button
                        backgroundColor={Colors.BLUE}
                        text={"SEND REPORT"}
                        height={70}
                        width={'60%'}
                        flex={null}
                        onPress={() => this.__saveReportAndGoBackToReportsScreen(
                            this.__getReportFromCurrentUserData())}/>
                    <Button
                        icon={{name: 'camera-alt', color: 'white'}}
                        backgroundColor={Colors.SUMMER_BLUE}
                        text={""}
                        height={70}
                        width={'20%'}
                        flex={null}
                        onPress={() => this.props.navigation.navigate('RCamera')}/>
                    <Button
                        icon={{name: 'photo-library', color: 'white'}}
                        backgroundColor={Colors.BLACK}
                        text={""}
                        height={70}
                        width={'20%'}
                        flex={null}
                        onPress={() => ImagePicker.launchImageLibraryAsync({base64: true})
                            .then(it => this.setState({photos: R.concat(this.state.photos, [it])}))}
                    />
                </HBox>
            </ScrollView>
        </Screen>
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: 'white',
        color: 'black',
    }
})

