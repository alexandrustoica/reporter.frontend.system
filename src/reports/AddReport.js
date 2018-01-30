import React from "react";
import {IconType} from "../icon/IconType";
import {EditText} from "../components/EditText";
import MapView from "react-native-maps";
import {Button} from "../components/Button";
import {Colors} from "../color/Colors";
import * as R from "ramda";
import {NavigationBar} from "../components/NavigationBar";
import {Screen} from "../screen/Screen";
import {ReportService} from "../service/ReportService";


class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

class Report {
    constructor(text, location) {
        this.text = text;
        this.location = location;
    }
}

export default class AddReport extends React.Component {

    static navigationOptions = {header: null}

    constructor(props) {
        super(props)
        this.state = {
            service: new ReportService(),
            text: '',
            region: {
                latitude: 0.0,
                longitude: 0.0,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }
        }
    }

    __saveUserLocationToInternalState = async (location) => {
        console.log(location)
        await this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }
        })
    }

    __getReportFromCurrentUserData = () => new Report(this.state.text,
            new Location(this.state.region.latitude, this.state.region.longitude))

    __sendSaveReportRequestToServer = async (report) =>
        await this.state.service.insert(report)

    __goToReportsScreenWithDataReloaded = () =>
        this.props.navigation.navigate('Reports')

    __saveReportAndGoBackToReportsScreen = (report) =>
        R.compose(this.__goToReportsScreenWithDataReloaded,
            this.__sendSaveReportRequestToServer)(report)

    componentDidMount = async () => {
        await navigator.geolocation.getCurrentPosition(
            (location) => this.__saveUserLocationToInternalState(location),
            (error) => console.log(error),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000})
    }

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                leftIcon={IconType.BACK_DARK}
                text={"Add Report"}
                leftAction={() => this.props.navigation.goBack()}/>
            <EditText
                fontSize={20}
                multiline={true}
                text={"Write a short description for your report..."}
                onChangeText={(text) => this.setState({text: text})}/>
            <MapView
                style={{width: "100%", flex: 1}}
                showsUserLocation={true}
                region={this.state.region}>
                <MapView.Marker coordinate={{
                    longitude: this.state.region.longitude,
                    latitude: this.state.region.latitude,
                }}/>
            </MapView>
            <Button
                icon={IconType.PLUS_LIGHT}
                backgroundColor={Colors.BLUE}
                text={""}
                height={70}
                flex={null}
                onPress={() => this.__saveReportAndGoBackToReportsScreen(
                    this.__getReportFromCurrentUserData())}/>
        </Screen>
}