import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Colors} from "../elements/color/Colors";
import {Box} from "../elements/box/Box";
import MapView from "react-native-maps";
import {SystemIcon} from "../elements/icon/SystemIcon";
import {IconType} from "../elements/icon/IconType";
import {HBox} from "../elements/box/HBox";
import {Icon} from "react-native-elements";

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
    constructor(id, title, primaryText, secondaryText, location, type) {
        this.id = id
        this.title = title
        this.primaryText = primaryText
        this.secondaryText = secondaryText
        this.location = location
        this.type = type
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
        onPress={() =>
            props.navigation.navigate('Report', {item: props.item})}
        style={CardStyle}>
        {props.item.location !== undefined ?
            <Map {...props}/> : <Cover {...props}/>}
        <HBox style={{paddingRight: 20}}>
            <Box flexDirection={'column'}>
            <Text style={TitleStyle}>{props.item.title}</Text>
            <Text style={DateStyle}>{props.item.secondaryText}</Text>
        </Box>
        <Icon name={(props.item.type === 'PARKING') ? 'local-parking':
            (props.item.type === 'DUMP') ? 'delete': 'palette'}
              color={'#d93c19'}/>
        </HBox>
    </TouchableOpacity>

ItemReport.defaultProps = {
    item: new ItemModelAdaptor("Test", "1 day ago"),
    icon: IconType.REPORTS_ICON,
    coverColor: Colors.LIGHT_BLUE
}