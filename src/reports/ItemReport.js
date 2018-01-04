import {Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../stateless/color/Colors";
import {Box} from "../box/Box";
import MapView from "react-native-maps";
import * as React from "react";
import moment from "moment";

const CardStyle = {
	elevation: 3,
	marginTop: 10,
	marginBottom: 10,
	marginLeft: 20,
	marginRight: 20,
	borderRadius: 5,
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
		style={CardStyle}>
		<MapView
			style={MapStyle}
			scrollEnabled={false}
			zoomEnabled={false}
			initialRegion={{
				longitude: props.report.location.longitude,
				latitude: props.report.location.longitude,
				latitudeDelta: 1,
				longitudeDelta: 1,
			}}> <MapView.Marker coordinate={{
			longitude: props.report.location.longitude,
			latitude: props.report.location.longitude
		}}/>
		</MapView>
		<Box flexDirection={'column'}>
			<Text style={TitleStyle}>{props.report.text}</Text>
			<Text style={DateStyle}>{moment(props.report.date).fromNow()}</Text>
		</Box>
	</TouchableOpacity>

ItemReport.defaultProps = {
	report: null
}