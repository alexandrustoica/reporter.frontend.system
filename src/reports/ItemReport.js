import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Colors} from "../color/Colors";
import {Box} from "../box/Box";
import MapView from "react-native-maps";
import moment from "moment";
import {AnimatedViewComingFromRight} from "../animations/AnimatedViewComingFromRight";
import {AnimatedViewFadeIn} from "../animations/AnimatedViewFadeIn";

const CardStyle = {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: Colors.BLUE,
    shadowOffset: {
        width: 0,
        height: 10
    },
    shadowRadius: 40,
    shadowOpacity: 0.1,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
}

const MapStyle = {
    flex: 1,
    height: 200,
    margin: 5,
    borderRadius: 10
}

const TitleStyle = {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold'
}

const DateStyle = {
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 20,
}

export const ItemReport = (props) =>
        <TouchableOpacity
            onPress={() =>
                props.navigation.navigate('Report', {report: props.report})}
            style={CardStyle}>
            <AnimatedViewFadeIn style={MapStyle}>
            <MapView
                style={MapStyle}
                scrollEnabled={false}
                zoomEnabled={false}
                initialRegion={{
                    longitude: props.report.location.longitude,
                    latitude: props.report.location.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}>
                <MapView.Marker coordinate={{
                    longitude: props.report.location.longitude,
                    latitude: props.report.location.longitude,
                }}/>
            </MapView>
            </AnimatedViewFadeIn>
            <AnimatedViewComingFromRight>
            <Box flexDirection={'column'}>
                <Text style={TitleStyle}>{props.report.text}</Text>
                <Text
                    style={DateStyle}>{moment(props.report.date).fromNow()}</Text>
            </Box>
            </AnimatedViewComingFromRight>
        </TouchableOpacity>

ItemReport.defaultProps = {
    report: {}
}