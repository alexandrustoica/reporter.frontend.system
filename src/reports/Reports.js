import React from "react";
import {FlatList, Text, TouchableOpacity} from "react-native"
import {ReportService} from "./ReportService";
import {Box} from "../box/Box";
import * as R from "ramda";
import createStore from "redux/es/createStore";
import {HBox} from "../box/HBox";
import MapView from "react-native-maps"
import {Colors} from "../stateless/color/Colors";
import moment from "moment";



const ItemReport = (props) =>
	<TouchableOpacity
		style={{
			marginTop: 10,
			marginBottom: 10,
			marginLeft: 20,
			marginRight: 20,
			backgroundColor: Colors.WHITE,
			borderRadius: 5,
		}}>
		<MapView
			style={{
				flex: 1,
				height: 200,
				padding: 10,
				borderRadius: 10
			}}
			scrollEnabled={false}
			zoomEnabled={false}
			initialRegion={{
				longitude: props.report.location.longitude,
				latitude: props.report.location.longitude,
				latitudeDelta: 1,
				longitudeDelta: 1,
			}}>
			<MapView.Marker
				coordinate={{
					longitude: props.report.location.longitude,
					latitude: props.report.location.longitude
				}}/>
		</MapView>
		<Box flexDirection={'column'}>
			<Text style={{
				marginTop: 10,
				marginLeft: 20,
				fontSize: 24,
				fontWeight: 'bold'
			}}>
				{props.report.text}
			</Text>
			<Text style={{
				marginTop: 5,
				marginLeft: 20,
				marginBottom: 20,
			}}>
				{moment(props.report.date).fromNow()}
			</Text>
		</Box>
	</TouchableOpacity>

ItemReport.defaultProps = {
	mapHeight: 200,
	report: {
		date: 'Report Date',
		text: 'Report Text',
		id: 1,
		location: {
			latitude: 10.0,
			longitude: 10.0
		}
	}
}

export default class Reports extends React.Component {

	static navigationOptions = {header: null};

	constructor(props) {
		super(props)
		this.state = {
			service: new ReportService(),
			reports: [],
			store: createStore(this.__updateReportsFromServer)
		}
		this.state.store.subscribe(this.render)
	}

	componentWillMount = async () => {
		await this.setState({
			reports: R.forEach(console.log, await this.state.service.reports())
		})
	}

	__updateReportsFromServer = async (state = this.state, action) => {
		const handler = {
			"UPDATE_REPORTS": async () => await this.setState((lastState) => {
				return {reports: R.concat(lastState.reports, R.forEach(console.log, action.data))}
			})
		}
		return handler[action.type](action.data)
	}

	__signalNeedToUpdateReports = async () =>
		this.state.store.dispatch({
			type: "UPDATE_REPORTS",
			data: await this.state.service.reports()
		})

	__showNewReportsToUserInList = (items) =>
		<FlatList data={items}
		          onEndReached={() => this.__signalNeedToUpdateReports()}
		          keyExtractor={(item, id) => id}
		          renderItem={({item}) =>
			          <ItemReport report={item}/>}/>

	render = () =>
		<Box>
			{this.__showNewReportsToUserInList(this.state.reports)}
		</Box>
}

