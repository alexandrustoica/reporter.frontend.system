import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Colors} from "../color/Colors";
import {Box} from "../box/Box";
import MapView from "react-native-maps";
import {AnimatedViewComingFromRight} from "../animations/AnimatedViewComingFromRight";
import {AnimatedViewFadeIn} from "../animations/AnimatedViewFadeIn";
import {SystemIcon} from "../icon/SystemIcon";
import {IconType} from "../icon/IconType";

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
    shadowRadius: 10,
    shadowOpacity: 0.15,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
}

const MapStyle = {
    flex: 1,
    height: 200,
    margin: 5,
    borderRadius: 10,
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

export class ItemModelAdaptor {
    constructor(id, primaryText, secondaryText, location) {
        this.id = id
        this.primaryText = primaryText;
        this.secondaryText = secondaryText;
        this.location = location;
    }
}

const Map = (props) =>
    <MapView
        style={MapStyle}
        scrollEnabled={false}
        zoomEnabled={false}
        initialRegion={{
            longitude: props.item.location.longitude,
            latitude: props.item.location.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }}>
        <MapView.Marker coordinate={{
            longitude: props.item.location.longitude,
            latitude: props.item.location.latitude,
        }}/>
    </MapView>

const Cover = (props) =>
    <Box alignItems={'center'}
         justifyContent={'center'}
         style={[MapStyle, {backgroundColor: props.coverColor}]}>
        <SystemIcon url={props.icon}/>
    </Box>

export const ItemReport = (props) =>
    <TouchableOpacity
        activeOpacity={1.0}
        onLongPress={() => console.log()}
        onPress={() =>
            props.navigation.navigate('Report', {item: props.item})}
        style={CardStyle}>
        <AnimatedViewFadeIn style={MapStyle}>
            {props.item.location !== undefined ?
                <Map {...props}/> : <Cover {...props}/>}
        </AnimatedViewFadeIn>
        <AnimatedViewComingFromRight>
            <Box flexDirection={'column'}>
                <Text style={TitleStyle}>{props.item.primaryText}</Text>
                <Text style={DateStyle}>{props.item.secondaryText}</Text>
            </Box>
        </AnimatedViewComingFromRight>
    </TouchableOpacity>

ItemReport.defaultProps = {
    item: new ItemModelAdaptor("Test", "1 day ago"),
    icon: IconType.REPORTS_ICON,
    coverColor: Colors.LIGHT_BLUE
}