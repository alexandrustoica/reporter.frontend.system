import React from "react";
import {StatusBar, Text, View} from "react-native";
import {Camera, Permissions} from 'expo';
import {Colors} from "../elements/color/Colors";
import {Button} from "../elements/components/Button";
import {Screen} from "../elements/box/screen/Screen";
import {NavigationBar} from "../elements/components/NavigationBar";
import {Box} from "../elements/box/Box";
import {store} from "../utils/store";
import {ReportAction} from "../service/ReportEpicActions";

export class RCamera extends React.Component {

    static navigationOptions = {
        header: null,
    };

    __unsubscribePhotoObserver = store.subscribe(() => {
        const photos = store.getState().reportsReducer.photos
        if (photos !== undefined) {
            this.__unsubscribePhotoObserver()
            this.props.navigation.goBack()
        }
    })

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    __renderCameraScreen = () =>
        <Screen backgroundColor={'transparent'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"/>
            <NavigationBar
                leftIcon={{name: 'arrow-back', color: 'white'}}
                color={'black'}
                text={""}
                align={'left'}
                leftAction={() => this.props.navigation.goBack()}/>
            <Camera ref={ref => {this.camera = ref}}
                    style={{flex: 1}}
                    type={this.state.type}>
                <Box justifyContent={'flex-end'}>
                    <Button icon={{name: 'camera', color: 'white'}}
                            backgroundColor={Colors.BLUE}
                            text={""}
                            height={70}
                            flex={null}
                            onPress={() => {
                                const token = store.getState().systemReducer.token
                                store.dispatch(new ReportAction(token)
                                    .takePhoto(this.camera))
                            }}/>
                </Box>
            </Camera>
        </Screen>

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const {hasCameraPermission} = this.state;
        return hasCameraPermission === null ?
            (<View/>) :
            hasCameraPermission === false ?
                (<Text>No access to camera</Text>) :
                this.__renderCameraScreen()
    }
}