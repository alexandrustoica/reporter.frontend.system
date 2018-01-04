import React from "react";
import {FlatList} from "react-native"
import {ReportService} from "./ReportService";
import {Box} from "../box/Box";
import * as R from "ramda";
import createStore from "redux/es/createStore";
import NavigationBar from "../stateless/complex/NavigationBar";
import {IconType} from "../icon/Icon";
import {Screen} from "../stateless/decorators/Screen";
import {ActionButton} from "../components/ActionButton";
import {ItemReport} from "./ItemReport";

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
		<Screen backgroundColor={'white'}>
			<NavigationBar
				text={"Reports"}
				leftIcon={IconType.PROFILE_DARK}
				leftAction={() => this.props.navigation.navigate('Welcome')}
				rightIcon={IconType.TIME_DARK}/>
			{this.__showNewReportsToUserInList(this.state.reports)}
			<Box justifyContent={'flex-end'}
			     alignItems={'flex-end'}
			     style={{
				     position: 'absolute',
				     margin: -20,
				     width: '100%',
				     height: '100%'
			     }}>
				<ActionButton onPress={() => console.log("Click")}/>
			</Box>
		</Screen>
}

