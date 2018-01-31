import React from "react";
import {IconType} from "../icon/IconType";
import {EditText} from "../components/EditText";
import MapView from "react-native-maps";
import {Button} from "../components/Button";
import {Colors} from "../color/Colors";
import * as R from "ramda";
import {NavigationBar} from "../components/NavigationBar";
import {Screen} from "../screen/Screen";
import {Controller} from "../repository/Controller";
import {DataFromTaskModel, TaskController} from "../data/TaskController";

export class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class Report {
    constructor(text, location) {
        this.text = text;
        this.location = location;
    }
}

export default class UpdateComponent extends React.Component {

    static navigationOptions = {header: null}

    constructor(props) {
        super(props)
        this.state = {
            controller: new TaskController(),
            text: '',
            item: this.props.navigation.state.params.item,
        }
    }

    __getReportFromCurrentUserData = () =>
        new DataFromTaskModel(
            this.state.item.data.id,
            this.state.text,
            this.state.item.data.status,
            this.state.item.data.updated)

    __sendSaveReportRequestToServer = async (report) =>
        await this.state.controller.updateItemToLocalAndRemoteLocation(report)

    __goToReportsScreenWithDataReloaded = () =>
        this.props.navigation.navigate('Reports')

    __saveReportAndGoBackToReportsScreen = (report) =>
        R.compose(this.__goToReportsScreenWithDataReloaded,
            this.__sendSaveReportRequestToServer)(report)


    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                leftIcon={IconType.BACK_DARK}
                text={"Update"}
                align={'left'}
                leftAction={() => this.props.navigation.goBack()}/>
            <EditText
                fontSize={20}
                text={this.state.item.primaryText}
                onChangeText={(text) => this.setState({text: text})}/>
            <Button
                backgroundColor={Colors.BLUE}
                text={"UPDATE"}
                height={70}
                flex={null}
                onPress={() => this.__saveReportAndGoBackToReportsScreen(
                    this.__getReportFromCurrentUserData())}/>
        </Screen>
}