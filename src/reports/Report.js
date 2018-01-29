import React from "react";
import {ReportService} from "./ReportService";
import {Box} from "../box/Box";
import {IconType} from "../icon/Icon";
import {Screen} from "../stateless/decorators/Screen";
import {ActionButton} from "../components/ActionButton";
import moment from "moment/moment";
import MapView from "react-native-maps";
import {Text} from "react-native";
import {Colors} from "../color/Colors";
import {AnimatedViewFadeIn} from "../animations/AnimatedViewFadeIn";
import {NavigationBar} from "../stateless/NavigationBar";

export default class Report extends React.Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props)
        this.state = {
            service: new ReportService(),
            report: this.props.navigation.state.params.report
        }
    }

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"My Report"}
                leftIcon={IconType.BACK_DARK}
                leftAction={() => this.props.navigation.goBack()}/>
            <Box flexDirection={'column'} style={{margin: 20}}>
                <Text style={{fontSize: 45, fontWeight: 'bold'}}>
                    {this.state.report.text}
                </Text>
                <Text style={{marginTop: 10, fontSize: 18}}>
                    {moment(this.state.report.date).fromNow()}
                </Text>
            </Box>
            <AnimatedViewFadeIn style={{width: "100%", flex: 2}}>
            <MapView
                style={{width: "100%", flex: 2}}
                initialRegion={{
                    longitude: this.state.report.location.longitude,
                    latitude: this.state.report.location.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}>
                <MapView.Marker coordinate={{
                    longitude: this.state.report.location.longitude,
                    latitude: this.state.report.location.longitude,
                }}/>
            </MapView>
            </AnimatedViewFadeIn>
            <Box justifyContent={'flex-end'}
                 alignItems={'flex-end'}
                 pointerEvents={'box-none'}
                 style={{
                     position: 'absolute',
                     margin: -20,
                     width: '100%',
                     height: '56%'
                 }}>
                <ActionButton
                icon={IconType.DELETE_LIGHT}
                    backgroundColor={Colors.LIGHT_BLUE}
                    onPress={async () => {
                    await this.state.service.remove(this.state.report.id)
                    this.props.navigation.navigate('Reports')
                }}/>
            </Box>
        </Screen>
}

