import React from "react";
import {View, Text} from "react-native";
import {Camera, Permissions} from 'expo';
import {IconType} from "../icon/IconType";
import {Colors} from "../color/Colors";
import {Button} from "../components/Button";
import {Screen} from "../screen/Screen";
import {NavigationBar} from "../components/NavigationBar";
import {Box} from "../box/Box";

export class RCamera extends React.Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    __renderCameraScreen = () =>
        <Screen backgroundColor={'transparent'}>
            <NavigationBar
                leftIcon={IconType.BACK_LIGHT}
                color={'black'}
                text={""}
                align={'left'}
                leftAction={() => this.props.navigation.goBack()}/>
            <Camera ref={ref => {this.camera = ref}}
                    style={{flex: 1}}
                    type={this.state.type}>
                <Box justifyContent={'flex-end'}>
                    <Button icon={IconType.PLUS_LIGHT}
                            backgroundColor={Colors.BLUE}
                            text={""}
                            height={70}
                            flex={null}
                            onPress={async () => {
                                const photo = await this.camera.takePictureAsync();
                                console.log(photo)
                            }}/>
                </Box>

            </Camera>

        </Screen>

    render() {
        const {hasCameraPermission} = this.state;
        return hasCameraPermission === null ?
            (<View/>) :
            hasCameraPermission === false ?
                (<Text>No access to camera</Text>) :
                this.__renderCameraScreen()
    }
}