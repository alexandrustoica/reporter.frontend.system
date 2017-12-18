import React from "react";
import {IconType, SystemIcon} from "../../stateless/shape/Icon";
import TopBarNavigation from "../../stateless/complex/NavigationBar";
import {Colors} from "../../stateless/color/Colors";
import {EmptyListDisplayed} from "../../stateless/list/EmptyListDisplayer";
import {ActionButton} from "../../stateless/button/ActionButton";
import {Screen} from "../../stateless/decorators/Screen";
import {AsyncStorage, FlatList, Text, View} from "react-native"
import {ReportService} from "../../service/ReportService";
import {CenterContainer} from "../../stateless/container/CenterContainer";
import {SpaceProvider} from "../../stateless/other/SpaceProvider";

const RoundedViewContainer = ({radius = 5, backgroundColor = 'red', children}) =>
	<View
		style={{borderRadius: radius, backgroundColor: backgroundColor}}>{children}</View>

const HBoxContainer = ({children}) =>
	<CenterContainer
		style={{flex: 1, flexDirection: 'row'}}>{children}</CenterContainer>

const TopHBoxContainer = ({children}) =>
	<View
		style={{flex: 1, flexDirection: 'row', alignItems: "flex-start"}}>{children}</View>

const VBoxContainer = ({children}) =>
	<CenterContainer
		style={{flex: 1, flexDirection: 'column'}}>{children}</CenterContainer>

const FlexibleMarginContainer = ({marginRight = 20, marginLeft = 20, marginTop = 20, marginBottom = 20, children}) =>
	<View style={{
		marginLeft: marginLeft,
		marginTop: marginTop,
		marginBottom: marginBottom,
		marginRight: marginRight
	}}>{children}</View>

const BiMarginContainer = ({marginY = 20, marginX = 20, children}) =>
	<FlexibleMarginContainer
		marginRight={marginY}
		marginLeft={marginY}
		marginTop={marginX}
		marginBottom={marginX}>
		{children}
	</FlexibleMarginContainer>

const ItemListView = ({text = "note"}) =>
	<BiMarginContainer marginY={20} marginX={5}>
		<TopHBoxContainer>
			<RoundedViewContainer backgroundColor={'#ABEDD8'}>
				<SystemIcon url={IconType.BACK_DARK}/>
			</RoundedViewContainer>
			<SpaceProvider width={10}/>
			<CenterContainer style={{backgroundColor: 'white', height: 80}}>
				<Text>{text}</Text>
			</CenterContainer>
		</TopHBoxContainer>
	</BiMarginContainer>

export default class Reports extends React.Component {

	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props)
		this.state = {service: new ReportService(), reports: []}
	}

	async componentDidMount() {
		this.loadNextPageOfReports(await this.state.service.reports())
	}

	loadNextPageOfReports = (items) => this.setState({reports: items})

	showReports = (items) =>
		<FlatList data={items}
		          onScroll={async () => await this.loadNextPageOfReports(
		          	this.state.reports.concat(await this.state.service.reports()))}
		          keyExtractor={(item, id) => id}
		          renderItem={({item}) => <ItemListView
			          text={item.text}/>}/>

	showEmptyList = () => <EmptyListDisplayed
		cause={'You don\'t have any tasks.'}
		solution={'Please add a task to get started.'}/>

	render = () =>
		<Screen backgroundColor={'#F7F7F7'}>
			<TopBarNavigation
				leftIcon={IconType.PROFILE_DARK}
				rightIcon={IconType.SEARCH_DARK}
				text={"Reports"}/>
			{this.state.reports.length === 0 ? this.showEmptyList() : this.showReports(this.state.reports)}
			<ActionButton icon={IconType.PLUS_LIGHT}
			              color={Colors.BLUE}
			              onPress={() => this.props.navigation.navigate('AddReport')}/>
		</Screen>
}

